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

function saveScreenshot(sourcePath, filename) {
  const repoPath = path.join(REPO_SCREENSHOTS, filename);
  const artifactPath = path.join(ARTIFACT_SCREENSHOTS, filename);
  const artifactRootPath = path.join(ARTIFACT_ROOT, filename);

  fs.copyFileSync(sourcePath, repoPath);
  fs.copyFileSync(sourcePath, artifactPath);
  fs.copyFileSync(sourcePath, artifactRootPath);
  console.log(`Saved screenshot: ${filename}`);
}

async function capture() {
  console.log('Launching headless Chrome for Stage 2 Quotation & Add-ons capture...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // Helper to transition from Stage 1 to Stage 2
  async function setupStage2(page) {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 20000 });
    await new Promise((r) => setTimeout(r, 600));

    // Type email
    const emailInput = await page.$('input[type="email"]');
    if (emailInput) {
      await emailInput.type('dr.azman@chubb.com.my');
    }

    // Check consent checkbox
    await page.evaluate(() => {
      const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
      if (checkboxes.length > 0) {
        checkboxes[0].click();
      }
    });

    // Click Generate Quotation
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const genBtn = btns.find((b) => b.textContent && b.textContent.includes('Generate Quotation'));
      if (genBtn) genBtn.click();
    });

    // Wait for Stage 2 heading
    await page.waitForFunction(() => {
      return document.body.innerText.includes('Your Indicative Chubb Indemnity Quote');
    }, { timeout: 10000 });
    await new Promise((r) => setTimeout(r, 800));
  }

  // 1. Base Quotation Desktop (1440px)
  console.log('1. Capturing Base Quotation Desktop...');
  const page1 = await browser.newPage();
  await page1.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await setupStage2(page1);
  const tempPath1 = path.join(REPO_SCREENSHOTS, 'temp_base_desktop.png');
  await page1.screenshot({ path: tempPath1, fullPage: true });
  saveScreenshot(tempPath1, 'stage2-base-quotation-desktop-1440px.png');
  fs.unlinkSync(tempPath1);

  // 2. Eligible Add-ons Revealed (Desktop)
  console.log('2. Capturing Eligible Add-ons Revealed...');
  // Answer Yes to Clinic ownership
  await page1.evaluate(() => {
    const radio = document.querySelector('button[aria-label="Yes, I own or partner in a private clinic"]');
    if (radio) radio.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  // Select Sole Proprietor
  await page1.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const soleProp = btns.find((b) => b.textContent && b.textContent.includes('Sole Proprietor'));
    if (soleProp) soleProp.click();
  });
  await new Promise((r) => setTimeout(r, 400));

  // Answer Yes to PIC own clinic
  await page1.evaluate(() => {
    const radio = document.querySelector('button[aria-label="Yes, I am Person-In-Charge of my own clinic"]');
    if (radio) radio.click();
  });
  await new Promise((r) => setTimeout(r, 800));

  const tempPath2 = path.join(REPO_SCREENSHOTS, 'temp_eligible.png');
  await page1.screenshot({ path: tempPath2, fullPage: true });
  saveScreenshot(tempPath2, 'stage2-eligible-addons-desktop-1440px.png');
  fs.unlinkSync(tempPath2);

  // 3. Selected Add-ons with Recalculation (Desktop)
  console.log('3. Capturing Selected Add-ons with Recalculation...');
  // Select Clinic Add-on
  await page1.evaluate(() => {
    const clinicCb = document.querySelector('input[aria-label="Clinic Entity Facility Indemnity"]');
    if (clinicCb) clinicCb.click();
  });
  await new Promise((r) => setTimeout(r, 800));

  // Select RM 1,000,000 clinic limit
  await page1.evaluate(() => {
    const tiers = Array.from(document.querySelectorAll('div[role="radio"]'));
    const tier1m = tiers.find((t) => t.textContent && t.textContent.includes('RM 1,000,000'));
    if (tier1m) tier1m.click();
  });
  await new Promise((r) => setTimeout(r, 800));

  // Select PIC Add-on
  await page1.evaluate(() => {
    const picCb = document.querySelector('input[aria-label="Person-In-Charge (PIC) Statutory Defense Extension"]');
    if (picCb) picCb.click();
  });
  await new Promise((r) => setTimeout(r, 1200));

  const tempPath3 = path.join(REPO_SCREENSHOTS, 'temp_selected.png');
  await page1.screenshot({ path: tempPath3, fullPage: true });
  saveScreenshot(tempPath3, 'stage2-selected-addons-desktop-1440px.png');
  fs.unlinkSync(tempPath3);

  // 4. Removed Add-on / Upstream Reconciliation Notice
  console.log('4. Capturing Upstream Reconciliation Notice...');
  // Toggle clinic ownership to No
  await page1.evaluate(() => {
    const noRadio = document.querySelector('button[aria-label="No, I do not own or partner in a private clinic"]');
    if (noRadio) noRadio.click();
  });
  await new Promise((r) => setTimeout(r, 1000));

  const tempPath4 = path.join(REPO_SCREENSHOTS, 'temp_removed.png');
  await page1.screenshot({ path: tempPath4, fullPage: true });
  saveScreenshot(tempPath4, 'stage2-reconciliation-notice-desktop-1440px.png');
  fs.unlinkSync(tempPath4);

  // 5. Educational Modal Dialog ("Why Clinic Coverage Recommended?")
  console.log('5. Capturing Modal Dialog...');
  // Toggle clinic ownership back to Yes
  await page1.evaluate(() => {
    const yesRadio = document.querySelector('button[aria-label="Yes, I own or partner in a private clinic"]');
    if (yesRadio) yesRadio.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  // Open Clinic Why Modal
  await page1.evaluate(() => {
    const whyBtn = document.querySelector('button[aria-label="Why clinic coverage is recommended"]');
    if (whyBtn) whyBtn.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  const tempPath5 = path.join(REPO_SCREENSHOTS, 'temp_modal.png');
  await page1.screenshot({ path: tempPath5 });
  saveScreenshot(tempPath5, 'stage2-modal-dialog-desktop-1440px.png');
  fs.unlinkSync(tempPath5);
  await page1.close();

  // 6. Tablet Viewport (768px)
  console.log('6. Capturing Tablet Viewport (768px)...');
  const pageTablet = await browser.newPage();
  await pageTablet.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await setupStage2(pageTablet);
  const tempPathTablet = path.join(REPO_SCREENSHOTS, 'temp_tablet.png');
  await pageTablet.screenshot({ path: tempPathTablet, fullPage: true });
  saveScreenshot(tempPathTablet, 'stage2-quotation-tablet-768px.png');
  fs.unlinkSync(tempPathTablet);
  await pageTablet.close();

  // 7. Mobile Viewport (390px - iPhone 14)
  console.log('7. Capturing Mobile Viewport (390px)...');
  const pageMobile = await browser.newPage();
  await pageMobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await setupStage2(pageMobile);
  const tempPathMobile = path.join(REPO_SCREENSHOTS, 'temp_mobile.png');
  await pageMobile.screenshot({ path: tempPathMobile, fullPage: true });
  saveScreenshot(tempPathMobile, 'stage2-quotation-mobile-390px.png');
  fs.unlinkSync(tempPathMobile);
  await pageMobile.close();

  await browser.close();
  console.log('All Stage 2 screenshots successfully captured!');
}

capture().catch((err) => {
  console.error('Stage 2 capture error:', err);
  process.exit(1);
});

