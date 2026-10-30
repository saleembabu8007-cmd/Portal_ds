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
  console.log('Launching headless Chrome for Visual Foundations captures...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const targets = [
    {
      name: 'foundations_specimen',
      url: 'http://localhost:5173/tokens-specimen',
    },
    {
      name: 'stage1_foundations',
      url: 'http://localhost:5173/stage1-foundation',
    },
  ];

  for (const target of targets) {
    console.log(`\n--- Capturing ${target.name} ---`);

    // 1. Desktop Viewport (1440 x 900)
    const desktopPage = await browser.newPage();
    await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    console.log(`Navigating desktop to ${target.url} ...`);
    await desktopPage.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
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
    await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    console.log(`Navigating mobile to ${target.url} ...`);
    await mobilePage.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
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
  console.log('\nAll Foundation screenshots successfully captured!');
}

capture().catch((err) => {
  console.error('Capture failed:', err);
  process.exit(1);
});
