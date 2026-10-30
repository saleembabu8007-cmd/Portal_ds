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
  console.log('Launching headless Chrome for Molecule Gallery capture...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Desktop Viewport 1440 x 900
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  console.log('Navigating to http://127.0.0.1:4173/catalog ...');
  await page.goto('http://127.0.0.1:4173/catalog', { waitUntil: 'networkidle0', timeout: 15000 });

  // Ensure "Form Molecules (26)" tab is active (it is default)
  await new Promise((r) => setTimeout(r, 1000));

  const desktopRepoPath = path.join(REPO_SCREENSHOTS, 'molecules-gallery-desktop-1440px.png');
  const desktopArtifactPath = path.join(ARTIFACT_SCREENSHOTS, 'molecules-gallery-desktop-1440px.png');

  await page.screenshot({ path: desktopRepoPath, fullPage: true });
  fs.copyFileSync(desktopRepoPath, desktopArtifactPath);
  console.log('Saved Desktop Screenshot:', desktopArtifactPath);

  // Mobile Viewport 390 x 844 (iPhone 12 / Modern Mobile)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));

  const mobileRepoPath = path.join(REPO_SCREENSHOTS, 'molecules-gallery-mobile-390px.png');
  const mobileArtifactPath = path.join(ARTIFACT_SCREENSHOTS, 'molecules-gallery-mobile-390px.png');

  await page.screenshot({ path: mobileRepoPath, fullPage: true });
  fs.copyFileSync(mobileRepoPath, mobileArtifactPath);
  console.log('Saved Mobile Screenshot:', mobileArtifactPath);

  await browser.close();
  console.log('Done.');
}

capture().catch((err) => {
  console.error('Capture failed:', err);
  process.exit(1);
});

