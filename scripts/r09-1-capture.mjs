import { chromium } from 'playwright';
import { copyFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const baseUrl = process.env.HEALTHCARE_PREVIEW_URL || 'http://127.0.0.1:4173';
const root = process.cwd();
const screenshotDir = path.join(root, 'assets', 'screenshots');
const publicScreenshotDir = path.join(root, 'public', 'assets', 'screenshots');
const videoDir = path.join(root, 'assets', 'videos');
const publicVideoDir = path.join(root, 'public', 'assets', 'videos');
const rawDir = path.join('/private/tmp', 'r09-1-raw-videos');
const projects = [
  { slug: 'aurelia', route: '/sites/aurelia/index.html', section: '.aurelia-catalog' },
  { slug: 'forma', route: '/sites/forma/index.html', section: '.forma-services' },
  { slug: 'clarity', route: '/sites/clarity/index.html', section: '.clarity-catalog' },
  { slug: 'movewell', route: '/sites/movewell/index.html', section: '.mw-services' }
];
const captureProjects = process.env.R09_CAPTURE_SLUG
  ? projects.filter(project => project.slug === process.env.R09_CAPTURE_SLUG)
  : projects;
if (!captureProjects.length) throw new Error('Unknown R09_CAPTURE_SLUG: ' + process.env.R09_CAPTURE_SLUG);

await mkdir(screenshotDir, { recursive: true });
await mkdir(publicScreenshotDir, { recursive: true });
await mkdir(videoDir, { recursive: true });
await mkdir(publicVideoDir, { recursive: true });
await rm(rawDir, { recursive: true, force: true });
await mkdir(rawDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-gpu']
});

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const futureDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 5);
  return date.toISOString().slice(0, 10);
};

async function setEnglish(page) {
  const language = page.getByLabel('Language');
  if (await language.count()) await language.selectOption('en');
}

async function captureScreenshots(project) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await page.goto(baseUrl + project.route, { waitUntil: 'networkidle' });
  await setEnglish(page);
  await page.locator(project.section).scrollIntoViewIfNeeded();
  await page.evaluate(() => document.fonts.ready);
  await wait(450);
  const desktopName = 'r09-1-' + project.slug + '-desktop.jpg';
  const desktopPath = path.join(screenshotDir, desktopName);
  await page.screenshot({ path: desktopPath, type: 'jpeg', quality: 88, fullPage: false, animations: 'disabled' });
  await copyFile(desktopPath, path.join(publicScreenshotDir, desktopName));

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseUrl + project.route, { waitUntil: 'networkidle' });
  await setEnglish(page);
  await page.locator(project.section).scrollIntoViewIfNeeded();
  await page.evaluate(() => document.fonts.ready);
  await wait(450);
  const mobileName = 'r09-1-' + project.slug + '-mobile.jpg';
  const mobilePath = path.join(screenshotDir, mobileName);
  await page.screenshot({ path: mobilePath, type: 'jpeg', quality: 88, fullPage: false, animations: 'disabled' });
  await copyFile(mobilePath, path.join(publicScreenshotDir, mobileName));
  await page.close();
  return { desktop: desktopName, mobile: mobileName };
}

async function recordVideo(project) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    recordVideo: { dir: rawDir, size: { width: 1280, height: 720 } }
  });
  const page = await context.newPage();
  await page.goto(baseUrl + project.route, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const started = Date.now();
  await wait(1400);
  await setEnglish(page);

  if (project.slug === 'aurelia') {
    await page.locator('.aurelia-nav a').first().click();
    await page.locator('.aurelia-catalog').scrollIntoViewIfNeeded();
    await wait(1500);
    await page.getByRole('button', { name: 'Skin care' }).click();
    await wait(1500);
    await page.locator('.treatment-name').first().click();
    await wait(1700);
    await page.getByRole('button', { name: 'Close' }).last().click();
    await wait(900);
    await page.locator('.row-add').first().click();
    await wait(1500);
    await page.getByRole('button', { name: /Your selection/ }).click();
    await wait(1700);
    await page.getByRole('button', { name: 'Close' }).last().click();
    await page.locator('.header-book').click();
    await page.getByRole('button', { name: 'Skin-care session' }).click();
    await page.getByLabel('A day that suits you').fill(futureDate());
    await page.getByRole('button', { name: '15:30' }).click();
    await wait(1800);
  } else if (project.slug === 'forma') {
    await page.locator('.forma-services').scrollIntoViewIfNeeded();
    await wait(1600);
    await page.locator('.forma-filter button').nth(1).click();
    await wait(1500);
    await page.locator('.forma-service button').first().click();
    await page.locator('.forma-practitioner-types button').nth(1).click();
    await page.getByRole('dialog').getByLabel('Date', { exact: true }).fill(futureDate());
    await page.getByRole('button', { name: '11:30' }).click();
    await wait(1600);
    await page.getByRole('button', { name: 'Prepare a visit plan' }).click();
    await wait(1400);
    await page.getByRole('button', { name: 'Close' }).last().click();
    await page.locator('.forma-faq-item button').first().click();
    await wait(900);
  } else if (project.slug === 'clarity') {
    await page.locator('.clarity-catalog').scrollIntoViewIfNeeded();
    await wait(1600);
    await page.locator('.clarity-searchbox input').fill('vitamin D');
    await wait(1400);
    await page.locator('.test-row > div > button').first().click();
    await wait(1900);
    await page.getByRole('button', { name: 'Add to plan' }).last().click();
    await page.locator('.visit-selection button').click();
    await page.getByRole('button', { name: 'At a collection site' }).click();
    await page.getByLabel('Date').fill(futureDate());
    await page.getByRole('button', { name: '10:00' }).click();
    await wait(1700);
    await page.getByRole('button', { name: 'Build a sample plan' }).click();
    await wait(1300);
  } else {
    await page.locator('.mw-services').scrollIntoViewIfNeeded();
    await wait(1600);
    await page.getByRole('button', { name: 'Movement sessions' }).click();
    await wait(1500);
    await page.locator('.mw-service-list article button').first().click();
    await page.locator('.move-session-options button').nth(1).click();
    await page.getByLabel('Choose a day').fill(futureDate());
    await page.getByRole('button', { name: '14:30' }).click();
    await wait(1700);
    await page.getByRole('button', { name: 'Preview my plan' }).click();
    await wait(1400);
  }

  const minimumMs = 18500;
  const elapsed = Date.now() - started;
  if (elapsed < minimumMs) await wait(minimumMs - elapsed);
  const video = page.video();
  await context.close();
  const rawPath = await video.path();
  const outputName = project.slug + '-demo.mp4';
  const outputPath = path.join(publicVideoDir, outputName);
  const encode = spawnSync('ffmpeg', [
    '-y', '-i', rawPath, '-an',
    '-vf', 'scale=1280:720:flags=lanczos,fps=24',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '27',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    outputPath
  ], { encoding: 'utf8' });
  if (encode.status !== 0) throw new Error('ffmpeg failed for ' + project.slug + ': ' + encode.stderr.slice(-1800));
  const durationResult = spawnSync('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', outputPath
  ], { encoding: 'utf8' });
  if (durationResult.status !== 0) throw new Error('ffprobe failed for ' + project.slug);
  const duration = Number(durationResult.stdout.trim());
  if (duration < 15 || duration > 25) throw new Error(project.slug + ' video duration is outside 15–25 seconds: ' + duration);
  await copyFile(outputPath, path.join(videoDir, outputName));
  return { file: outputName, durationSeconds: Number(duration.toFixed(2)) };
}

try {
  const results = [];
  for (const project of captureProjects) {
    const screenshots = await captureScreenshots(project);
    const video = await recordVideo(project);
    results.push({ project: project.slug, screenshots, video });
  }
  console.log(JSON.stringify({ result: 'passed', baseUrl, captures: results }, null, 2));
} finally {
  await browser.close();
}

