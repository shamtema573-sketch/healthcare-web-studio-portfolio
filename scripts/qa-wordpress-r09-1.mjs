import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const baseUrl = process.env.WORDPRESS_PREVIEW_URL || 'http://127.0.0.1:9443';
const evidenceDir = path.resolve('assets/screenshots');
await mkdir(evidenceDir, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const failures = [];
page.on('response', response => { if (response.status() >= 400) failures.push({ status: response.status(), url: response.url() }); });
try {
  const front = await page.goto(baseUrl + '/', { waitUntil: 'networkidle', timeout: 30000 });
  assert.equal(front.status(), 200);
  assert.ok(await page.locator('h1').count(), 'The activated theme should render a front-page heading');
  const heading = (await page.locator('h1').first().innerText()).trim();
  const stylesheet = await page.request.get(baseUrl + '/wp-content/themes/aurelia/style.css');
  assert.equal(stylesheet.status(), 200, 'Aurelia theme stylesheet should load');
  const themeCss = await stylesheet.text();
  assert.ok(themeCss.includes('Theme Name: Aurelia Concept'));

  const admin = await page.goto(baseUrl + '/wp-admin/themes.php', { waitUntil: 'networkidle', timeout: 30000 });
  assert.equal(admin.status(), 200, 'WordPress theme admin should be reachable in the temporary auto-login session');
  const adminText = await page.locator('body').innerText();
  assert.ok(adminText.includes('Active: Aurelia Concept'));
  assert.match(adminText, /Version 7\.1\.4/);
  assert.deepEqual(failures, [], `WordPress page returned errors: ${JSON.stringify(failures)}`);

  await page.goto(baseUrl + '/', { waitUntil: 'networkidle' });
  const screenshot = path.join(evidenceDir, 'r09-1-wordpress-playground.jpg');
  await page.screenshot({ path: screenshot, type: 'jpeg', quality: 88, fullPage: false, animations: 'disabled' });
  const report = {
    revision: 'R09.1', checkedAt: new Date().toISOString(), mode: 'temporary local WordPress Playground server',
    phpVersion: '8.3 (CLI launch flag)', wordpressVersion: '7.1.4 (admin page)', theme: 'Aurelia Concept',
    checks: {
      frontPageHttp200: true, renderedHeading: heading, themeStylesheetHttp200: true,
      themeActiveInAdmin: true, adminHttp200: true, browserHttpErrors: failures.length
    },
    limits: [
      'This was a local PHP 8.3 WordPress Playground runtime, not the KD-8 Docker host.',
      'The theme was mounted from the existing source and was active on the generated local WordPress site.',
      'This does not verify a client host, MySQL compatibility, production content editing, or a live booking integration.'
    ],
    screenshot: 'assets/screenshots/r09-1-wordpress-playground.jpg'
  };
  await writeFile(path.join(evidenceDir, 'wordpress-playground-r09-1.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ result: 'passed', report }, null, 2));
} catch (error) {
  await writeFile(path.join(evidenceDir, 'wordpress-playground-r09-1.json'), JSON.stringify({ result: 'failed', checkedAt: new Date().toISOString(), error: String(error), failures }, null, 2));
  throw error;
} finally {
  await browser.close();
}
