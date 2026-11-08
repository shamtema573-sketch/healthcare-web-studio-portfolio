import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const baseUrl = process.env.HEALTHCARE_PREVIEW_URL ?? 'http://127.0.0.1:4173';
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const screenshotDir = path.resolve('assets/screenshots');
await mkdir(screenshotDir, { recursive: true });

const routes = [
  { key: 'portfolio', path: '/', nav: '.portfolio-nav' },
  { key: 'aurelia', path: '/sites/aurelia/index.html', nav: '.aurelia-nav' },
  { key: 'forma', path: '/sites/forma/index.html', nav: '.forma-nav' },
  { key: 'clarity', path: '/sites/clarity/index.html', nav: '.clarity-nav' },
  { key: 'movewell', path: '/sites/movewell/index.html', nav: '.mw-nav' }
];
const report = { baseUrl, checkedAt: new Date().toISOString(), responsive: [], journeys: [], screenshots: [], consoleErrors: [], failedResponses: [] };
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
  ?? (process.platform === 'darwin' && existsSync(chromePath) ? chromePath : undefined);
const browser = await chromium.launch({
  headless: true,
  executablePath,
  args: ['--no-sandbox', '--disable-gpu']
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
page.on('pageerror', error => report.consoleErrors.push(`pageerror: ${error.message}`));
page.on('console', message => { if (message.type() === 'error') report.consoleErrors.push(`console: ${message.text()} (${message.location().url ?? 'unknown source'})`); });
page.on('response', response => { if (response.status() >= 400) report.failedResponses.push({ status: response.status(), url: response.url() }); });

const record = (name, evidence) => report.journeys.push({ name, ...evidence });
const futureDate = (days = 5) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};
async function go(route) {
  await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
}
async function screenshot(name, mobile = false) {
  await page.evaluate(() => {
    document.querySelectorAll('img[loading="lazy"]').forEach(image => { image.loading = 'eager'; });
  });
  await page.evaluate(() => Promise.all([...document.images].map(image => image.decode().catch(() => null))));
  const file = `${name}.jpg`;
  await page.screenshot({
    path: path.join(screenshotDir, file),
    type: 'jpeg',
    quality: 82,
    fullPage: true,
    animations: 'disabled',
    timeout: 30000
  });
  report.screenshots.push({ file: `assets/screenshots/${file}`, viewport: mobile ? '390px' : '1440px', fullPage: true });
}

try {
  // Open every entry point and prove all referenced imagery has loaded.
  for (const route of routes) {
    await go(route.path);
    assert.ok(await page.locator('h1').count(), `${route.key} must have a main heading`);
    const images = await page.evaluate(() => [...document.images].map(image => ({ src: image.currentSrc, loaded: image.complete && image.naturalWidth > 0 })));
    assert.ok(images.every(image => image.loaded), `${route.key} has a broken image`);
    record(`${route.key} entry and artwork`, { heading: await page.locator('h1').first().innerText(), images: images.length });

    for (const width of [375, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
      const size = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
      assert.ok(size.content <= size.viewport, `${route.key} horizontal overflow at ${width}px (${size.content}/${size.viewport})`);
      report.responsive.push({ site: route.key, targetWidth: width, ...size, noHorizontalOverflow: true });
    }

    // Mobile menu must open, navigate, and close on every entry point.
    await page.setViewportSize({ width: 375, height: 812 });
    const menu = page.locator('.mobile-menu-button');
    assert.ok(await menu.isVisible(), `${route.key} mobile menu button is visible`);
    await menu.click();
    assert.equal(await menu.getAttribute('aria-expanded'), 'true', `${route.key} mobile menu opens`);
    await page.locator(`${route.nav}.is-open a`).first().click();
    assert.equal(await menu.getAttribute('aria-expanded'), 'false', `${route.key} mobile menu closes after navigation`);
    record(`${route.key} mobile navigation`, { open: true, closesAfterLink: true });

    await page.setViewportSize({ width: 1440, height: 1000 });
    await go(route.path);
    await screenshot(`${route.key}-desktop`);
    await page.setViewportSize({ width: 390, height: 844 });
    await go(route.path);
    await screenshot(`${route.key}-mobile`, true);
  }

  // Portfolio cards route to all four independent demo entry points.
  await page.setViewportSize({ width: 1440, height: 1000 });
  await go('/');
  const projectLinks = await page.locator('.project-image').evaluateAll(links => links.map(link => ({ href: link.getAttribute('href'), label: link.querySelector('img')?.alt })));
  assert.equal(projectLinks.length, 4, 'Portfolio shows four project demos');
  for (const link of projectLinks) {
    const response = await page.request.get(new URL(link.href, baseUrl).toString());
    assert.equal(response.status(), 200, `Demo route loads: ${link.href}`);
  }
  record('portfolio project links', { count: projectLinks.length, routes: projectLinks.map(link => link.href) });

  // Aurelia: language, category, cart arithmetic, removal, checkout, and local booking.
  await go('/sites/aurelia/index.html');
  await page.getByLabel('Language').selectOption('en');
  await page.getByRole('button', { name: 'Skin care' }).click();
  assert.equal(await page.locator('.treatment-row').count(), 2);
  await page.getByRole('button', { name: 'Add to bag: Skin balance facial' }).click();
  await page.getByRole('button', { name: 'Your selection, 1' }).click();
  assert.match(await page.locator('.cart-drawer').innerText(), /5,200 ₽/);
  await page.getByRole('button', { name: 'Increase quantity' }).click();
  assert.match(await page.locator('.cart-drawer').innerText(), /10,400 ₽/);
  await page.getByRole('button', { name: 'Decrease quantity' }).click();
  await page.getByRole('button', { name: 'Remove' }).click();
  assert.match(await page.locator('.cart-drawer').innerText(), /Nothing selected yet/);
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Add to bag: Skin balance facial' }).click();
  await page.getByRole('button', { name: 'Your selection, 1' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  assert.match(await page.getByRole('status').innerText(), /Demo order assembled/);
  await page.getByRole('button', { name: 'Choose a time' }).first().click();
  await page.locator('.dialog input[type="date"]').fill(futureDate());
  await page.locator('.dialog select').selectOption('12:00');
  await page.getByRole('button', { name: 'Prepare demo booking' }).click();
  assert.match(await page.getByRole('dialog').innerText(), /Nothing was sent or saved/);
  record('Aurelia shopping and booking demo', { filterRows: 2, totalAfterQuantityChange: '10,400 ₽', removal: true, checkout: 'local confirmation', booking: 'local confirmation' });

  // Keep a clear visual of the basket as a case-study feature screenshot.
  await go('/sites/aurelia/index.html');
  await page.getByLabel('Language').selectOption('en');
  await page.getByRole('button', { name: 'Add to bag: Skin balance facial' }).click();
  await page.getByRole('button', { name: 'Your selection, 1' }).click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: path.join(screenshotDir, 'aurelia-cart-demo.jpg'), type: 'jpeg', quality: 84, fullPage: false, animations: 'disabled' });
  report.screenshots.push({ file: 'assets/screenshots/aurelia-cart-demo.jpg', viewport: '1440px', fullPage: false });

  // Forma: service filter, translated profiles, appointment date/time, and FAQ.
  await go('/sites/forma/index.html');
  await page.getByRole('button', { name: 'Терапия' }).click();
  assert.equal(await page.locator('.forma-service').count(), 1);
  await page.getByRole('button', { name: /Мира Коваль/ }).click();
  await page.getByLabel('Language').selectOption('en');
  assert.equal(await page.locator('.forma-service').count(), 4);
  assert.equal(await page.locator('.dentist-detail h3').innerText(), 'Mira Koval');
  await page.locator('.date-picker-panel input[type="date"]').fill(futureDate());
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.locator('.dialog input[type="date"]').fill(futureDate());
  await page.locator('.dialog select').selectOption('15:30');
  await page.getByRole('button', { name: 'Prepare demo booking' }).click();
  assert.match(await page.getByRole('dialog').innerText(), /Demo time prepared/);
  await page.getByRole('button', { name: 'Close' }).last().click();
  await page.getByRole('button', { name: 'Can I make an appointment?' }).click();
  assert.equal(await page.getByRole('button', { name: 'Can I make an appointment?' }).getAttribute('aria-expanded'), 'true');
  record('Forma service, profile, and booking demo', { filterRows: 1, EnglishProfile: 'Mira Koval', dateAndTime: true, faq: true });

  // Clarity: search, category, details, selection plan, and a no-data visit form.
  await go('/sites/clarity/index.html');
  await page.getByPlaceholder('Например, витамин D').fill('витамин D');
  assert.equal(await page.locator('.test-row').count(), 1);
  await page.getByRole('button', { name: 'Очистить поиск' }).click();
  await page.getByRole('button', { name: 'Биохимия' }).click();
  assert.equal(await page.locator('.test-row').count(), 2);
  await page.getByRole('button', { name: /Липидный профиль/ }).click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: path.join(screenshotDir, 'clarity-test-detail.jpg'), type: 'jpeg', quality: 84, fullPage: false, animations: 'disabled' });
  report.screenshots.push({ file: 'assets/screenshots/clarity-test-detail.jpg', viewport: '1440px', fullPage: false });
  await page.getByRole('button', { name: 'Добавить в план' }).last().click();
  assert.match(await page.locator('.visit-selection').innerText(), /Выбрано исследований: 1/);
  await page.locator('.visit-selection button').click();
  await page.locator('.dialog input[type="date"]').fill(futureDate());
  await page.locator('.dialog select').selectOption('10:30');
  await page.getByRole('button', { name: 'Подготовить демо-запись' }).click();
  assert.match(await page.getByRole('dialog').innerText(), /Данные не отправляются и не сохраняются/);
  await page.getByRole('button', { name: 'Закрыть' }).last().click();
  await page.getByLabel('Language').selectOption('en');
  assert.match(await page.locator('.clarity-catalog-heading h2').innerText(), /Test directory/);
  record('Clarity catalogue and visit plan', { searchRows: 1, categoryRows: 2, selectedTests: 1, noDataSubmission: true, EnglishLocale: true });

  // MoveWell: service filter, FAQ, language switch, and the consultation demo.
  await go('/sites/movewell/index.html');
  await page.getByRole('button', { name: 'Movement sessions' }).click();
  assert.equal(await page.locator('.mw-service-list article').count(), 1);
  await page.getByRole('button', { name: 'Are these real practitioners?' }).click();
  assert.equal(await page.getByRole('button', { name: 'Are these real practitioners?' }).getAttribute('aria-expanded'), 'true');
  await page.getByLabel('Language').selectOption('ru');
  assert.match(await page.locator('.mw-hero-copy h1').innerText(), /Двигаться легче/);
  await page.getByRole('button', { name: 'Начать разговор' }).first().click();
  await page.locator('.dialog input[type="date"]').fill(futureDate());
  await page.locator('.dialog select').selectOption('10:30');
  await page.getByRole('button', { name: 'Подготовить демо-запись' }).click();
  assert.match(await page.getByRole('dialog').innerText(), /Демо-запрос подготовлен/);
  record('MoveWell service and consultation demo', { filteredRows: 1, FAQ: true, RussianLocale: true, localBooking: true });

  assert.deepEqual(report.consoleErrors, [], `Browser console has errors: ${report.consoleErrors.join('; ')}; failed responses: ${JSON.stringify(report.failedResponses)}`);
  await writeFile(path.join(screenshotDir, 'qa-report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({
    result: 'passed',
    responsiveChecks: report.responsive.length,
    journeys: report.journeys.length,
    screenshots: report.screenshots.length,
    consoleErrors: report.consoleErrors,
    screenshotDir
  }, null, 2));
} finally {
  await browser.close();
}
