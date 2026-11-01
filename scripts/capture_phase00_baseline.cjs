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
  console.log('Launching headless Chrome for Phase 00 Baseline capture...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // --- 1. STAGE 1 (COVERAGE) ---
  console.log('Capturing Stage 1 Desktop (1440px)...');
  const pageS1 = await browser.newPage();
  await pageS1.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await pageS1.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 20000 });
  await new Promise((r) => setTimeout(r, 600));

  const s1Desktop = path.join(REPO_SCREENSHOTS, 'temp_b_s1_desktop.png');
  await pageS1.screenshot({ path: s1Desktop, fullPage: true });
  saveScreenshot(s1Desktop, 'baseline-stage1-coverage-desktop-1440px.png');
  fs.unlinkSync(s1Desktop);

  console.log('Capturing Stage 1 Mobile (390px)...');
  await pageS1.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await new Promise((r) => setTimeout(r, 400));
  const s1Mobile = path.join(REPO_SCREENSHOTS, 'temp_b_s1_mobile.png');
  await pageS1.screenshot({ path: s1Mobile, fullPage: true });
  saveScreenshot(s1Mobile, 'baseline-stage1-coverage-mobile-390px.png');
  fs.unlinkSync(s1Mobile);
  await pageS1.close();

  // --- 2. STAGE 2 (QUOTATION) ---
  console.log('Navigating and capturing Stage 2 Desktop (1440px)...');
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 20000 });
  await new Promise((r) => setTimeout(r, 400));

  const emailInput = await page.$('input[type="email"]');
  if (emailInput) await emailInput.type('dr.azman@chubb.com.my');

  await page.evaluate(() => {
    const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    if (checkboxes.length > 0) checkboxes[0].click();
    const btns = Array.from(document.querySelectorAll('button'));
    const genBtn = btns.find((b) => b.textContent && b.textContent.includes('Generate Quotation'));
    if (genBtn) genBtn.click();
  });

  await page.waitForFunction(() => document.body.innerText.includes('Your Indicative Chubb Indemnity Quote'), {
    timeout: 10000,
  });
  await new Promise((r) => setTimeout(r, 600));

  const s2Desktop = path.join(REPO_SCREENSHOTS, 'temp_b_s2_desktop.png');
  await page.screenshot({ path: s2Desktop, fullPage: true });
  saveScreenshot(s2Desktop, 'baseline-stage2-quotation-desktop-1440px.png');
  fs.unlinkSync(s2Desktop);

  console.log('Capturing Stage 2 Mobile (390px)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await new Promise((r) => setTimeout(r, 400));
  const s2Mobile = path.join(REPO_SCREENSHOTS, 'temp_b_s2_mobile.png');
  await page.screenshot({ path: s2Mobile, fullPage: true });
  saveScreenshot(s2Mobile, 'baseline-stage2-quotation-mobile-390px.png');
  fs.unlinkSync(s2Mobile);

  // --- 3. STAGE 3 (DETAILS & UNDERWRITING) ---
  console.log('Navigating and capturing Stage 3 Desktop (1440px)...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    const radio = document.querySelector('button[aria-label*="No, I do not own or partner"]');
    if (radio) radio.click();
  });
  await new Promise((r) => setTimeout(r, 300));
  await page.evaluate(() => {
    const radio = document.querySelector('button[aria-label*="not Person-In-Charge of another facility"]');
    if (radio) radio.click();
  });
  await new Promise((r) => setTimeout(r, 300));
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const proceedBtn = btns.find((b) => b.textContent && b.textContent.includes('Proceed to Personal Details'));
    if (proceedBtn) proceedBtn.click();
  });

  await page.waitForFunction(() => document.body.innerText.includes('Practitioner Identity & Underwriting Declarations'), {
    timeout: 10000,
  });
  await new Promise((r) => setTimeout(r, 600));

  // Fill sample data robustly
  await page.evaluate(() => {
    const setNativeVal = (selector, val) => {
      const input = document.querySelector(selector);
      if (input) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        setter.call(input, val);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    };

    setNativeVal('input[placeholder*="DR MUHAMMAD SALEEM"]', 'Dr. Azman bin Harun');
    setNativeVal('input[placeholder*="850412"]', '850412-14-5231');
    setNativeVal('input[placeholder*="54321"]', '54321');
    setNativeVal('input[placeholder*="012-3456789"]', '012-3456789');
    setNativeVal('input[placeholder*="Pantai Hospital"]', 'Pantai Hospital Kuala Lumpur');
    setNativeVal('input[placeholder*="Suite / Unit"]', '8 Jalan Bukit Pantai, Bangsar');
    setNativeVal('input[placeholder*="50480"]', '59100');
    setNativeVal('input[placeholder="Kuala Lumpur"]', 'Kuala Lumpur');

    const selects = Array.from(document.querySelectorAll('select'));
    const stateSelect = selects.find((s) => Array.from(s.options).some((o) => o.value.includes('Kuala Lumpur')));
    if (stateSelect) {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set;
      setter.call(stateSelect, 'Wilayah Persekutuan Kuala Lumpur');
      stateSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }

    const incomeSelect = selects.find((s) => Array.from(s.options).some((o) => o.value.includes('250,000')));
    if (incomeSelect) {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set;
      setter.call(incomeSelect, 'RM 250,000 - RM 500,000');
      incomeSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }

    const agreeRadio = document.querySelector('input[name="haveClaimEverBeenMade"][value="agree"]');
    if (agreeRadio) agreeRadio.click();

    const noRadios = document.querySelectorAll('input[value="no"]');
    noRadios.forEach((r) => r.click());

    const truthCheckbox = document.getElementById('final_declaration_accepted');
    if (truthCheckbox && !truthCheckbox.checked) truthCheckbox.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  const s3Desktop = path.join(REPO_SCREENSHOTS, 'temp_b_s3_desktop.png');
  await page.screenshot({ path: s3Desktop, fullPage: true });
  saveScreenshot(s3Desktop, 'baseline-stage3-particulars-desktop-1440px.png');
  fs.unlinkSync(s3Desktop);

  console.log('Capturing Stage 3 Mobile (390px)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await new Promise((r) => setTimeout(r, 400));
  const s3Mobile = path.join(REPO_SCREENSHOTS, 'temp_b_s3_mobile.png');
  await page.screenshot({ path: s3Mobile, fullPage: true });
  saveScreenshot(s3Mobile, 'baseline-stage3-particulars-mobile-390px.png');
  fs.unlinkSync(s3Mobile);

  // --- 4. STAGE 4 (SUMMARY & PAYMENT) ---
  console.log('Navigating and capturing Stage 4 Desktop (1440px)...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const proceedBtn = btns.find((b) => b.textContent && b.textContent.includes('Proceed to Review & Payment'));
    if (proceedBtn) proceedBtn.click();
  });

  await page.waitForFunction(() => document.body.innerText.includes('Review Policy Details & Authorize Payment'), {
    timeout: 10000,
  });
  await new Promise((r) => setTimeout(r, 600));

  const s4Desktop = path.join(REPO_SCREENSHOTS, 'temp_b_s4_desktop.png');
  await page.screenshot({ path: s4Desktop, fullPage: true });
  saveScreenshot(s4Desktop, 'baseline-stage4-summary-desktop-1440px.png');
  fs.unlinkSync(s4Desktop);

  console.log('Capturing Stage 4 Mobile (390px)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await new Promise((r) => setTimeout(r, 400));
  const s4Mobile = path.join(REPO_SCREENSHOTS, 'temp_b_s4_mobile.png');
  await page.screenshot({ path: s4Mobile, fullPage: true });
  saveScreenshot(s4Mobile, 'baseline-stage4-summary-mobile-390px.png');
  fs.unlinkSync(s4Mobile);

  await page.close();
  await browser.close();
  console.log('Phase 00 Baseline screenshot capture complete!');
}

capture().catch((err) => {
  console.error('Error during Phase 00 baseline capture:', err);
  process.exit(1);
});
