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
  console.log('Launching headless Chrome for Phase 09 capture...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  async function navigateToStage4(page) {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 20000 });
    await new Promise((r) => setTimeout(r, 500));

    // Stage 1
    const emailInput = await page.$('input[type="email"]');
    if (emailInput) await emailInput.type('dr.azman@chubb.com.my');

    await page.evaluate(() => {
      const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
      if (checkboxes.length > 0) checkboxes[0].click();
      const btns = Array.from(document.querySelectorAll('button'));
      const genBtn = btns.find((b) => b.textContent && b.textContent.includes('Generate Quotation'));
      if (genBtn) genBtn.click();
    });

    // Stage 2 wait
    await page.waitForFunction(() => document.body.innerText.includes('Your Indicative Chubb Indemnity Quote'), {
      timeout: 10000,
    });
    await new Promise((r) => setTimeout(r, 500));

    // Answer No to clinic ownership
    await page.evaluate(() => {
      const radio = document.querySelector('button[aria-label*="No, I do not own or partner"]');
      if (radio) radio.click();
    });
    await new Promise((r) => setTimeout(r, 400));

    // Answer No to PIC external
    await page.evaluate(() => {
      const radio = document.querySelector('button[aria-label*="not Person-In-Charge of another facility"]');
      if (radio) radio.click();
    });
    await new Promise((r) => setTimeout(r, 400));

    // Proceed to Stage 3
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const procBtn = btns.find((b) => b.textContent && b.textContent.includes('Proceed to Personal Details'));
      if (procBtn) procBtn.click();
    });

    // Stage 3 wait
    await page.waitForFunction(() => document.body.innerText.includes('Practitioner Identity & Underwriting Declarations'), {
      timeout: 10000,
    });
    await new Promise((r) => setTimeout(r, 600));

    // Fill Stage 3 Particulars & Underwriting
    await page.evaluate(() => {
      const setNativeVal = (sel, val) => {
        const input = document.querySelector(sel);
        if (input) {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          setter.call(input, val);
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      };

      setNativeVal('input[placeholder*="DR MUHAMMAD SALEEM"]', 'Dr. Siti Aminah binti Razali');
      setNativeVal('input[placeholder*="850412"]', '850412-14-5231');
      setNativeVal('input[placeholder*="54321"]', '54321');
      setNativeVal('input[placeholder*="012-3456789"]', '012-3456789');
      setNativeVal('input[placeholder*="Pantai Hospital"]', 'Pantai Hospital Kuala Lumpur');
      setNativeVal('input[placeholder*="Suite / Unit"]', '8 Jalan Bukit Pantai, Bangsar');
      setNativeVal('input[placeholder*="50480"]', '59100');
      setNativeVal('input[placeholder="Kuala Lumpur"]', 'Kuala Lumpur');

      // Select state dropdown
      const selects = Array.from(document.querySelectorAll('select'));
      const stateSelect = selects.find((s) => Array.from(s.options).some((o) => o.value.includes('Kuala Lumpur')));
      if (stateSelect) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set;
        setter.call(stateSelect, 'Wilayah Persekutuan Kuala Lumpur');
        stateSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }

      // Select income dropdown
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

    // Click Proceed to Review & Payment
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const procBtn = btns.find((b) => b.textContent && b.textContent.includes('Proceed to Review & Payment'));
      if (procBtn) procBtn.click();
    });

    // Wait for Stage 4
    await page.waitForFunction(() => document.body.innerText.includes('Review Policy Details & Authorize Payment'), {
      timeout: 10000,
    });
    await new Promise((r) => setTimeout(r, 600));
  }

  try {
    // 1. DESKTOP 1440px — STAGE 4 REVIEW & PAYMENT
    console.log('1. Capturing Desktop 1440px: Stage 4 Review & Payment...');
    const pageDesktop = await browser.newPage();
    await pageDesktop.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 2 });
    await navigateToStage4(pageDesktop);

    const tmp1 = path.join(__dirname, 'tmp_stage4_desktop.png');
    await pageDesktop.screenshot({ path: tmp1, fullPage: true });
    saveScreenshot(tmp1, 'stage4-review-desktop-1440px.png');
    fs.unlinkSync(tmp1);

    // 2. DESKTOP 1440px — PCI-DSS CHECKOUT GATEWAY MODAL
    console.log('2. Capturing Desktop 1440px: PCI-DSS Checkout Gateway Modal...');
    await pageDesktop.evaluate(() => {
      const chk1 = document.getElementById('consent_policy_wording');
      if (chk1 && !chk1.checked) chk1.click();
      const chk2 = document.getElementById('consent_duty_of_disclosure');
      if (chk2 && !chk2.checked) chk2.click();
      const chk3 = document.getElementById('consent_pdpa');
      if (chk3 && !chk3.checked) chk3.click();

      const btns = Array.from(document.querySelectorAll('button'));
      const payBtn = btns.find((b) => b.textContent && b.textContent.includes('Authorize & Pay'));
      if (payBtn) payBtn.click();
    });
    await pageDesktop.waitForFunction(() => document.body.innerText.includes('Secure Checkout Gateway (PCI-DSS)'), {
      timeout: 8000,
    });
    await new Promise((r) => setTimeout(r, 500));

    const tmp2 = path.join(__dirname, 'tmp_stage4_gateway.png');
    await pageDesktop.screenshot({ path: tmp2, fullPage: false });
    saveScreenshot(tmp2, 'stage4-gateway-modal-desktop-1440px.png');
    fs.unlinkSync(tmp2);

    // 3. DESKTOP 1440px — STAGE 5 POLICY CONFIRMATION (SIMULATE SUCCESS)
    console.log('3. Capturing Desktop 1440px: Stage 5 Policy Confirmation...');
    await pageDesktop.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const simSuccess = btns.find((b) => b.textContent && b.textContent.includes('Simulate Success'));
      if (simSuccess) simSuccess.click();
    });
    await pageDesktop.waitForFunction(() => document.body.innerText.includes('Your Indemnity Coverage is Active'), {
      timeout: 10000,
    });
    await new Promise((r) => setTimeout(r, 600));

    const tmp3 = path.join(__dirname, 'tmp_stage5_desktop.png');
    await pageDesktop.screenshot({ path: tmp3, fullPage: true });
    saveScreenshot(tmp3, 'stage5-confirmation-desktop-1440px.png');
    fs.unlinkSync(tmp3);
    await pageDesktop.close();

    // 4. TABLET 768px — STAGE 4 REVIEW & PAYMENT
    console.log('4. Capturing Tablet 768px: Stage 4 Review...');
    const pageTablet = await browser.newPage();
    await pageTablet.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
    await navigateToStage4(pageTablet);

    const tmp4 = path.join(__dirname, 'tmp_stage4_tablet.png');
    await pageTablet.screenshot({ path: tmp4, fullPage: true });
    saveScreenshot(tmp4, 'stage4-review-tablet-768px.png');
    fs.unlinkSync(tmp4);
    await pageTablet.close();

    // 5. MOBILE 390px — STAGE 4 REVIEW & PAYMENT
    console.log('5. Capturing Mobile 390px: Stage 4 Review...');
    const pageMobile = await browser.newPage();
    await pageMobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await navigateToStage4(pageMobile);

    const tmp5 = path.join(__dirname, 'tmp_stage4_mobile.png');
    await pageMobile.screenshot({ path: tmp5, fullPage: true });
    saveScreenshot(tmp5, 'stage4-review-mobile-390px.png');
    fs.unlinkSync(tmp5);

    // 6. MOBILE 390px — STAGE 5 CONFIRMATION
    console.log('6. Capturing Mobile 390px: Stage 5 Confirmation...');
    await pageMobile.evaluate(() => {
      const chk1 = document.getElementById('consent_policy_wording');
      if (chk1 && !chk1.checked) chk1.click();
      const chk2 = document.getElementById('consent_duty_of_disclosure');
      if (chk2 && !chk2.checked) chk2.click();
      const chk3 = document.getElementById('consent_pdpa');
      if (chk3 && !chk3.checked) chk3.click();

      const btns = Array.from(document.querySelectorAll('button'));
      const payBtn = btns.find((b) => b.textContent && b.textContent.includes('Authorize & Pay'));
      if (payBtn) payBtn.click();
    });
    await pageMobile.waitForFunction(() => document.body.innerText.includes('Secure Checkout Gateway (PCI-DSS)'), {
      timeout: 8000,
    });
    await new Promise((r) => setTimeout(r, 400));
    await pageMobile.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const simSuccess = btns.find((b) => b.textContent && b.textContent.includes('Simulate Success'));
      if (simSuccess) simSuccess.click();
    });
    await pageMobile.waitForFunction(() => document.body.innerText.includes('Your Indemnity Coverage is Active'), {
      timeout: 10000,
    });
    await new Promise((r) => setTimeout(r, 600));

    const tmp6 = path.join(__dirname, 'tmp_stage5_mobile.png');
    await pageMobile.screenshot({ path: tmp6, fullPage: true });
    saveScreenshot(tmp6, 'stage5-confirmation-mobile-390px.png');
    fs.unlinkSync(tmp6);
    await pageMobile.close();

    // 7. DESKTOP 1440px — SECONDARY REFERRAL SCAFFOLD
    console.log('7. Capturing Desktop 1440px: Adverse Underwriting Referral...');
    const pageRef = await browser.newPage();
    await pageRef.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 2 });
    await pageRef.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 20000 });
    await new Promise((r) => setTimeout(r, 500));

    // Quick fill Stage 1
    const emailInput2 = await pageRef.$('input[type="email"]');
    if (emailInput2) await emailInput2.type('dr.referral@test.com');
    await pageRef.evaluate(() => {
      const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
      if (checkboxes.length > 0) checkboxes[0].click();
      const btns = Array.from(document.querySelectorAll('button'));
      const genBtn = btns.find((b) => b.textContent && b.textContent.includes('Generate Quotation'));
      if (genBtn) genBtn.click();
    });
    await pageRef.waitForFunction(() => document.body.innerText.includes('Your Indicative Chubb Indemnity Quote'), {
      timeout: 10000,
    });
    await pageRef.evaluate(() => {
      const radio1 = document.querySelector('button[aria-label*="No, I do not own or partner"]');
      if (radio1) radio1.click();
      const radio2 = document.querySelector('button[aria-label*="not Person-In-Charge of another facility"]');
      if (radio2) radio2.click();
    });
    await new Promise((r) => setTimeout(r, 300));
    await pageRef.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const procBtn = btns.find((b) => b.textContent && b.textContent.includes('Proceed to Personal Details'));
      if (procBtn) procBtn.click();
    });
    await pageRef.waitForFunction(() => document.body.innerText.includes('Practitioner Identity & Underwriting Declarations'), {
      timeout: 10000,
    });

    await pageRef.evaluate(() => {
      const setNativeVal = (sel, val) => {
        const input = document.querySelector(sel);
        if (input) {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          setter.call(input, val);
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      };

      setNativeVal('input[placeholder*="DR MUHAMMAD SALEEM"]', 'Dr. Farhan bin Mansur');
      setNativeVal('input[placeholder*="850412"]', '850412-14-5231');
      setNativeVal('input[placeholder*="54321"]', '48921');
      setNativeVal('input[placeholder*="012-3456789"]', '013-9988776');
      setNativeVal('input[placeholder*="Pantai Hospital"]', 'Klinik Farhan');
      setNativeVal('input[placeholder*="Suite / Unit"]', 'No 22 Jalan Tun Razak');
      setNativeVal('input[placeholder*="50480"]', '50400');
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

      // Disagree on Q1
      const disagreeRadio = document.querySelector('input[name="haveClaimEverBeenMade"][value="disagree"]');
      if (disagreeRadio) disagreeRadio.click();

      const noRadios = document.querySelectorAll('input[value="no"]');
      noRadios.forEach((r) => r.click());

      const truthCheckbox = document.getElementById('final_declaration_accepted');
      if (truthCheckbox && !truthCheckbox.checked) truthCheckbox.click();

      const btns = Array.from(document.querySelectorAll('button'));
      const procBtn = btns.find((b) => b.textContent && b.textContent.includes('Proceed to Review & Payment'));
      if (procBtn) procBtn.click();
    });
    await pageRef.waitForFunction(() => document.body.innerText.includes('Your Application Has Been Referred'), {
      timeout: 10000,
    });
    await new Promise((r) => setTimeout(r, 600));

    const tmp7 = path.join(__dirname, 'tmp_referral_desktop.png');
    await pageRef.screenshot({ path: tmp7, fullPage: true });
    saveScreenshot(tmp7, 'secondary-referral-desktop-1440px.png');
    fs.unlinkSync(tmp7);
    await pageRef.close();

    console.log('All Phase 09 screenshots captured successfully!');
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    await browser.close();
  }
}

capture();
