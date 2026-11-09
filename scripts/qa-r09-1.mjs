import assert from 'node:assert/strict';
import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const baseUrl = process.env.HEALTHCARE_PREVIEW_URL || 'http://127.0.0.1:4173';
const shots = path.resolve('assets/screenshots');
const publicShots = path.resolve('public/assets/screenshots');
await mkdir(shots, { recursive: true });
await mkdir(publicShots, { recursive: true });

const routes = [
  { name: 'portfolio', path: '/' },
  ...['aurelia', 'forma', 'clarity', 'movewell'].map(name => ({ name, path: `/sites/${name}/index.html` })),
  ...['aurelia', 'forma', 'clarity', 'movewell'].map(name => ({ name: `${name}-case`, path: `/cases/${name}/index.html`, slug: name }))
];
const report = {
  revision: 'R09.1', baseUrl, checkedAt: new Date().toISOString(),
  routes: [], responsive: [], journeys: [], caseChecks: [], media: [], aureliaMobileRows: [],
  pageErrors: [], failedResponses: [], screenshots: []
};
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
page.on('pageerror', error => report.pageErrors.push(error.message));
page.on('console', message => { if (message.type() === 'error') report.pageErrors.push(message.text()); });
page.on('response', response => {
  if (response.status() >= 400) report.failedResponses.push({ status: response.status(), url: response.url() });
});
const futureDate = (days = 5) => {
  const date = new Date(); date.setDate(date.getDate() + days); return date.toISOString().slice(0, 10);
};
const open = route => page.goto(baseUrl + route, { waitUntil: 'networkidle' });
const getImages = () => page.evaluate(async () => {
  for (const image of document.images) image.loading = 'eager';
  await Promise.all([...document.images].map(image => image.decode().catch(() => null)));
  return [...document.images].map(image => ({ src: image.currentSrc, loaded: image.complete && image.naturalWidth > 0 }));
});
async function saveScreenshot(file, fullPage = false) {
  const imagePath = path.join(shots, file);
  await page.screenshot({ path: imagePath, type: 'jpeg', quality: 88, fullPage, animations: 'disabled' });
  await copyFile(imagePath, path.join(publicShots, file));
  report.screenshots.push(file);
}

try {
  // Check entry routes, image loads, and page width at common desktop/tablet/phone widths.
  for (const route of routes) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await open(route.path);
    assert.ok(await page.locator('h1').count(), `${route.name} needs a page heading`);
    const images = await getImages();
    assert.ok(images.every(image => image.loaded), `${route.name} has a broken image: ${JSON.stringify(images.filter(image => !image.loaded))}`);
    const entry = { route: route.path, heading: await page.locator('h1').first().innerText(), images: images.length };
    report.routes.push(entry);

    for (const width of [360, 375, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
      const size = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
      assert.ok(size.content <= size.viewport, `${route.name} horizontal overflow at ${width}px (${size.content}/${size.viewport})`);
      report.responsive.push({ route: route.path, width, ...size });
    }
  }

  // Home language switch, persistence, confirmed contact, and real running-interface screenshots.
  await page.setViewportSize({ width: 1440, height: 1000 });
  await open('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  const homeSwitch = page.locator('.portfolio-language-switch');
  await homeSwitch.getByRole('button', { name: 'EN' }).click();
  assert.match(await page.locator('h1').innerText(), /Healthcare sites/);
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  assert.match(await page.locator('.portfolio-nav').innerText(), /Selected work/);
  await homeSwitch.getByRole('button', { name: 'RU' }).click();
  assert.match(await page.locator('h1').innerText(), /Медицинские сайты/);
  assert.equal(await page.locator('html').getAttribute('lang'), 'ru');
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await page.locator('.portfolio-language-switch button[aria-pressed="true"]').innerText(), 'RU');
  const contactHref = await page.locator('.portfolio-contact').getAttribute('href');
  assert.equal(contactHref, 'https://github.com/shamtema573-sketch');
  assert.notEqual(contactHref, '#contact-note');
  const previews = await page.locator('.project-ui-preview img').evaluateAll(nodes => nodes.map(node => ({ alt: node.alt, src: node.getAttribute('src') })));
  assert.equal(previews.length, 4, 'Home page has four actual interface captures');
  assert.ok((await getImages()).every(image => image.loaded), 'Homepage screenshot thumbnails must load');
  await page.locator('.project-ui-preview').first().scrollIntoViewIfNeeded();
  await saveScreenshot('r09-1-portfolio-desktop.jpg');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('.project-ui-preview').first().scrollIntoViewIfNeeded();
  await saveScreenshot('r09-1-portfolio-mobile.jpg');
  report.journeys.push({ name: 'Portfolio language and contact', ru: true, en: true, persistsAfterReload: true, confirmedContact: contactHref, projectInterfaceCaptures: previews.length });

  // Aurelia mobile catalogue geometry: titles, descriptions, time and price stay in separate rows.
  await page.setViewportSize({ width: 390, height: 844 });
  await open('/sites/aurelia/index.html');
  await page.getByLabel('Language').selectOption('en');
  await page.locator('.aurelia-catalog').scrollIntoViewIfNeeded();
  const rowGeometry = await page.locator('.treatment-row').evaluateAll(rows => rows.slice(0, 6).map(row => {
    const rect = selector => {
      const box = row.querySelector(selector)?.getBoundingClientRect();
      return box ? { left: box.left, right: box.right, top: box.top, bottom: box.bottom, width: box.width, height: box.height } : null;
    };
    return { title: rect('.treatment-name span'), description: rect('.treatment-name small'), time: rect('.treatment-time'), price: rect('.treatment-price'), add: rect('.row-add') };
  }));
  assert.ok(rowGeometry.length >= 4, 'Aurelia mobile catalogue should show treatment rows');
  for (const [index, row] of rowGeometry.entries()) {
    assert.ok(row.title && row.description && row.time && row.price && row.add, `Aurelia row ${index + 1} has all catalogue fields`);
    assert.ok(row.description.bottom <= row.time.top + 2, `Aurelia row ${index + 1} description collides with duration`);
    assert.ok(row.price.right <= row.add.left + 1, `Aurelia row ${index + 1} price collides with add control`);
    assert.ok(row.add.width >= 44 && row.add.height >= 44, `Aurelia row ${index + 1} add control is too small`);
  }
  report.aureliaMobileRows = rowGeometry;
  report.journeys.push({ name: 'Aurelia mobile catalogue spacing', viewport: 390, checkedRows: rowGeometry.length, titleDescriptionAndMetaSeparate: true, addTargetsAtLeast44px: true });

  // Representative browser-only interaction in each project.
  await page.setViewportSize({ width: 1440, height: 1000 });
  await open('/sites/aurelia/index.html');
  await page.getByLabel('Language').selectOption('en');
  await page.getByRole('button', { name: 'Skin care' }).click();
  assert.equal(await page.locator('.treatment-row').count(), 2);
  await page.locator('.row-add').first().click();
  assert.match(await page.locator('.aurelia-header').innerText(), /1/);
  await page.locator('.header-book').click();
  await page.getByRole('button', { name: 'First consultation' }).click();
  await page.getByLabel('A day that suits you').fill(futureDate());
  await page.getByRole('button', { name: '12:00' }).click();
  await page.getByRole('button', { name: 'Prepare a demo visit' }).click();
  assert.match(await page.getByRole('dialog').getByRole('status').innerText(), /No appointment was created/);
  report.journeys.push({ name: 'Aurelia treatment filter, basket, and photo-led time selection', filteredRows: 2, basketAdd: true, bookingFlow: 'treatment, date, time' });

  await open('/sites/forma/index.html');
  await page.getByLabel('Language').selectOption('en');
  await page.getByRole('button', { name: 'Preventive' }).click();
  assert.ok(await page.locator('.forma-service').count() > 0);
  await page.locator('.date-picker-panel input[type="date"]').fill(futureDate());
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('dialog').getByRole('button', { name: /Mira Koval/ }).click();
  await page.getByRole('dialog').getByLabel('Date', { exact: true }).fill(futureDate());
  await page.getByRole('button', { name: '11:30' }).click();
  await page.getByRole('button', { name: 'Prepare a visit plan' }).click();
  assert.match(await page.getByRole('dialog').getByRole('heading').innerText(), /Visit plan is ready to review/);
  report.journeys.push({ name: 'Forma filter and visit board', filter: true, selectedClinician: 'fictional profile', dateTime: true, localConfirmation: true });

  await open('/sites/clarity/index.html');
  await page.getByLabel('Language').selectOption('en');
  await page.getByPlaceholder('Try “vitamin D”').fill('vitamin D');
  assert.ok(await page.locator('.test-row').count() > 0);
  await page.locator('.test-row > div > button').first().click();
  assert.equal(await page.getByRole('dialog').count(), 1);
  await page.getByRole('button', { name: 'Add to plan' }).last().click();
  assert.match(await page.locator('.visit-selection').innerText(), /Selected tests: 1/);
  await page.locator('.visit-selection button').click();
  await page.getByRole('button', { name: 'At a collection site' }).click();
  await page.getByRole('dialog').getByLabel('Date', { exact: true }).fill(futureDate());
  await page.getByRole('button', { name: '10:00' }).click();
  await page.getByRole('button', { name: 'Build a sample plan' }).click();
  assert.match(await page.getByRole('dialog').getByRole('status').innerText(), /Preparation details must be confirmed/);
  report.journeys.push({ name: 'Clarity search, test plan, and collection route', search: true, details: true, selectedItems: 1, bookingFlow: 'collection route and time window' });

  await open('/sites/movewell/index.html');
  await page.getByRole('button', { name: 'Movement sessions' }).click();
  assert.equal(await page.locator('.mw-service-list article').count(), 1);
  await page.locator('.mw-service-list article button').first().click();
  await page.locator('.move-session-options button').nth(1).click();
  await page.getByLabel('Choose a day').fill(futureDate());
  await page.getByRole('button', { name: '14:30' }).click();
  await page.getByRole('button', { name: 'Preview my plan' }).click();
  assert.match(await page.getByRole('dialog').getByRole('status').innerText(), /No appointment is reserved/);
  report.journeys.push({ name: 'MoveWell filter and movement-session planner', filteredRows: 1, bookingFlow: 'session, format, date, time', localConfirmation: true });

  // Case content and recorded clips on all four independent case pages.
  for (const slug of ['aurelia', 'forma', 'clarity', 'movewell']) {
    await open(`/cases/${slug}/index.html`);
    await page.locator('.portfolio-language-switch').getByRole('button', { name: 'EN' }).click();
    const story = await page.locator('.case-story-content').innerText();
    const visibleCaseCopy = (story + ' ' + await page.locator('.case-techline').innerText()).toLowerCase();
    for (const label of ['Task', 'Design', 'Functions', 'Mobile', 'Technology']) assert.ok(visibleCaseCopy.includes(label.toLowerCase()), `${slug} case missing ${label}`);
    const video = page.locator('video');
    await video.evaluate(element => element.load());
    await video.evaluate(element => element.readyState >= 1 ? true : new Promise((resolve, reject) => {
      element.addEventListener('loadedmetadata', resolve, { once: true });
      element.addEventListener('error', () => reject(new Error('Video metadata failed to load')), { once: true });
    }));
    const media = await video.evaluate(element => ({ src: element.querySelector('source')?.getAttribute('src'), duration: element.duration, width: element.videoWidth, height: element.videoHeight }));
    assert.ok(media.duration >= 15 && media.duration <= 25, `${slug} demo video must be 15–25 seconds (${media.duration})`);
    assert.equal(media.width, 1280);
    assert.equal(media.height, 720);
    const demoLink = await page.locator('.case-live-link').getAttribute('href');
    assert.equal((await page.request.get(new URL(demoLink, baseUrl).toString())).status(), 200);
    report.caseChecks.push({ slug, requiredSections: ['Task', 'Design', 'Functions', 'Mobile', 'Technology'], demoStatus: 200 });
    report.media.push({ slug, ...media });
  }

  assert.deepEqual(report.pageErrors, [], `Browser page errors: ${report.pageErrors.join('; ')}`);
  assert.deepEqual(report.failedResponses, [], `Failed HTTP responses: ${JSON.stringify(report.failedResponses)}`);
  report.result = 'passed';
  report.summary = { routes: report.routes.length, responsiveChecks: report.responsive.length, journeys: report.journeys.length, casePages: report.caseChecks.length, videos: report.media.length };
  await writeFile(path.join(shots, 'qa-report-r09-1.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ result: report.result, summary: report.summary, screenshots: report.screenshots }, null, 2));
} catch (error) {
  report.result = 'failed'; report.failure = error instanceof Error ? error.message : String(error);
  await writeFile(path.join(shots, 'qa-report-r09-1.json'), JSON.stringify(report, null, 2));
  throw error;
} finally {
  await browser.close();
}
