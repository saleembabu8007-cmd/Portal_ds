const puppeteer = require('../audit-runner/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const REPO_SCREENSHOTS = path.join(__dirname, '..', 'docs', 'evidence', 'screenshots');
const ARTIFACT_SCREENSHOTS = 'C:\\Users\\salee\\.gemini\\antigravity\\brain\\54b8aedc-dd01-4226-9a0a-224ea04249be\\screenshots';

[REPO_SCREENSHOTS, ARTIFACT_SCREENSHOTS].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

async function capture() {
  console.log('Launching headless Chrome for Organisms Gallery capture...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Desktop Viewport 1440 x 900
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  console.log('Navigating desktop to http://127.0.0.1:4173/catalog ...');
  await desktopPage.goto('http://127.0.0.1:4173/catalog', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1000));

  const desktopRepoPath = path.join(REPO_SCREENSHOTS, 'organisms-gallery-desktop-1440px.png');
  const desktopArtifactPath = path.join(ARTIFACT_SCREENSHOTS, 'organisms-gallery-desktop-1440px.png');

  await desktopPage.screenshot({ path: desktopRepoPath, fullPage: true });
  fs.copyFileSync(desktopRepoPath, desktopArtifactPath);
  console.log('Saved Desktop Screenshot:', desktopArtifactPath);
  await desktopPage.close();

  // Mobile Viewport 390 x 844 (iPhone 12 / Modern Mobile)
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  console.log('Navigating mobile to http://127.0.0.1:4173/catalog ...');
  await mobilePage.goto('http://127.0.0.1:4173/catalog', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1000));

  const mobileRepoPath = path.join(REPO_SCREENSHOTS, 'organisms-gallery-mobile-390px.png');
  const mobileArtifactPath = path.join(ARTIFACT_SCREENSHOTS, 'organisms-gallery-mobile-390px.png');

  await mobilePage.screenshot({ path: mobileRepoPath, fullPage: true });
  fs.copyFileSync(mobileRepoPath, mobileArtifactPath);
  console.log('Saved Mobile Screenshot:', mobileArtifactPath);
  await mobilePage.close();

  await browser.close();
  console.log('Done capturing organisms screenshots.');
}

capture().catch((err) => {
  console.error('Capture failed:', err);
  process.exit(1);
});
