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
  console.log('Launching headless Chrome for Stage 1 & Shell capture...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // 1. Desktop Viewport 1440 x 900
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  console.log('Navigating desktop to http://localhost:5173/ ...');
  await desktopPage.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1000));

  const desktopRepoPath = path.join(REPO_SCREENSHOTS, 'stage1-refined-desktop-1440px.png');
  const desktopArtifactPath = path.join(ARTIFACT_SCREENSHOTS, 'stage1-refined-desktop-1440px.png');
  const desktopArtifactRootPath = path.join(ARTIFACT_ROOT, 'stage1-refined-desktop-1440px.png');

  await desktopPage.screenshot({ path: desktopRepoPath, fullPage: true });
  fs.copyFileSync(desktopRepoPath, desktopArtifactPath);
  fs.copyFileSync(desktopRepoPath, desktopArtifactRootPath);
  console.log('Saved Desktop Screenshot:', desktopArtifactPath);
  await desktopPage.close();

  // 2. Tablet Viewport 768 x 1024 (iPad / Standard Tablet)
  const tabletPage = await browser.newPage();
  await tabletPage.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  console.log('Navigating tablet to http://localhost:5173/ ...');
  await tabletPage.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1000));

  const tabletRepoPath = path.join(REPO_SCREENSHOTS, 'stage1-refined-tablet-768px.png');
  const tabletArtifactPath = path.join(ARTIFACT_SCREENSHOTS, 'stage1-refined-tablet-768px.png');
  const tabletArtifactRootPath = path.join(ARTIFACT_ROOT, 'stage1-refined-tablet-768px.png');

  await tabletPage.screenshot({ path: tabletRepoPath, fullPage: true });
  fs.copyFileSync(tabletRepoPath, tabletArtifactPath);
  fs.copyFileSync(tabletRepoPath, tabletArtifactRootPath);
  console.log('Saved Tablet Screenshot:', tabletArtifactPath);
  await tabletPage.close();

  // 3. Mobile Viewport 390 x 844 (iPhone 14 / Modern Standard Mobile)
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  console.log('Navigating mobile to http://localhost:5173/ ...');
  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1000));

  const mobileRepoPath = path.join(REPO_SCREENSHOTS, 'stage1-refined-mobile-390px.png');
  const mobileArtifactPath = path.join(ARTIFACT_SCREENSHOTS, 'stage1-refined-mobile-390px.png');
  const mobileArtifactRootPath = path.join(ARTIFACT_ROOT, 'stage1-refined-mobile-390px.png');

  await mobilePage.screenshot({ path: mobileRepoPath, fullPage: true });
  fs.copyFileSync(mobileRepoPath, mobileArtifactPath);
  fs.copyFileSync(mobileRepoPath, mobileArtifactRootPath);
  console.log('Saved Mobile Screenshot:', mobileArtifactPath);
  await mobilePage.close();

  // 3. Desktop Modal Demonstration (Why 31st Dec Modal)
  const modalPage = await browser.newPage();
  await modalPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await modalPage.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise((r) => setTimeout(r, 500));

  // Find and click the "Why 31st December?" button
  await modalPage.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const target = btns.find((b) => b.textContent && b.textContent.includes('Why 31st December?'));
    if (target) target.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  const modalRepoPath = path.join(REPO_SCREENSHOTS, 'stage1-modal-desktop-1440px.png');
  const modalArtifactPath = path.join(ARTIFACT_SCREENSHOTS, 'stage1-modal-desktop-1440px.png');
  const modalArtifactRootPath = path.join(ARTIFACT_ROOT, 'stage1-modal-desktop-1440px.png');
  await modalPage.screenshot({ path: modalRepoPath });
  fs.copyFileSync(modalRepoPath, modalArtifactPath);
  fs.copyFileSync(modalRepoPath, modalArtifactRootPath);
  console.log('Saved Modal Screenshot:', modalArtifactPath);
  await modalPage.close();

  await browser.close();
  console.log('Done capturing Stage 1 screenshots.');
}

capture().catch((err) => {
  console.error('Capture failed:', err);
  process.exit(1);
});
