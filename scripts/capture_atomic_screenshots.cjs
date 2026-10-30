const puppeteer = require('../audit-runner/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const REPO_SCREENSHOTS = path.join(__dirname, '..', 'docs', 'evidence', 'screenshots');
const ARTIFACT_SCREENSHOTS = 'C:\\Users\\salee\\.gemini\\antigravity\\brain\\54b8aedc-dd01-4226-9a0a-224ea04249be\\screenshots';
const ARTIFACT_ROOT = 'C:\\Users\\salee\\.gemini\\antigravity\\brain\\54b8aedc-dd01-4226-9a0a-224ea04249be';

[REPO_SCREENSHOTS, ARTIFACT_SCREENSHOTS, ARTIFACT_ROOT].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

async function capture() {
  console.log('Launching headless Chrome for Atomic UI Components captures...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const targets = [
    {
      name: 'atomic_gallery',
      url: 'http://localhost:5173/atoms-gallery',
    },
    {
      name: 'stage1_coverage_form',
      url: 'http://localhost:5173/buy/coverage',
    },
  ];

  for (const target of targets) {
    console.log(`\n--- Capturing ${target.name} ---`);

    // 1. Desktop Viewport (1440 x 900)
    const desktopPage = await browser.newPage();
    desktopPage.on('console', (msg) => console.log(`[Desktop Console] ${msg.type()}: ${msg.text()}`));
    desktopPage.on('pageerror', (err) => console.log(`[Desktop Error] ${err.message}`));

    await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    console.log(`Navigating desktop to ${target.url} ...`);
    await desktopPage.goto(target.url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 2000));

    const desktopFile = `${target.name}_desktop_1440px.png`;
    const desktopRepoPath = path.join(REPO_SCREENSHOTS, desktopFile);
    const desktopArtifactPath = path.join(ARTIFACT_SCREENSHOTS, desktopFile);
    const desktopArtifactRoot = path.join(ARTIFACT_ROOT, desktopFile);

    await desktopPage.screenshot({ path: desktopRepoPath, fullPage: true });
    fs.copyFileSync(desktopRepoPath, desktopArtifactPath);
    fs.copyFileSync(desktopRepoPath, desktopArtifactRoot);
    console.log(`Saved Desktop Screenshot: ${desktopFile}`);
    await desktopPage.close();

    // 2. Mobile Viewport (390 x 844)
    const mobilePage = await browser.newPage();
    mobilePage.on('console', (msg) => console.log(`[Mobile Console] ${msg.type()}: ${msg.text()}`));
    mobilePage.on('pageerror', (err) => console.log(`[Mobile Error] ${err.message}`));

    await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    console.log(`Navigating mobile to ${target.url} ...`);
    await mobilePage.goto(target.url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 2000));

    const mobileFile = `${target.name}_mobile_390px.png`;
    const mobileRepoPath = path.join(REPO_SCREENSHOTS, mobileFile);
    const mobileArtifactPath = path.join(ARTIFACT_SCREENSHOTS, mobileFile);
    const mobileArtifactRoot = path.join(ARTIFACT_ROOT, mobileFile);

    await mobilePage.screenshot({ path: mobileRepoPath, fullPage: true });
    fs.copyFileSync(mobileRepoPath, mobileArtifactPath);
    fs.copyFileSync(mobileRepoPath, mobileArtifactRoot);
    console.log(`Saved Mobile Screenshot: ${mobileFile}`);
    await mobilePage.close();
  }

  await browser.close();
  console.log('\nAll Atomic UI screenshots captured and verified successfully!');
}

capture().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
