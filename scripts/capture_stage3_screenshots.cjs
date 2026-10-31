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
  console.log('Launching headless Chrome for Stage 3 capture...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  async function navigateToStage3(page, { ownsClinic = false } = {}) {
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

    if (ownsClinic) {
      await page.evaluate(() => {
        const radio = document.querySelector('button[aria-label*="Yes, I own or partner"]');
        if (radio) radio.click();
      });
      await new Promise((r) => setTimeout(r, 400));

      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const soleProp = btns.find((b) => b.textContent && b.textContent.includes('Sole Proprietor'));
        if (soleProp) soleProp.click();
      });
      await new Promise((r) => setTimeout(r, 400));

      await page.evaluate(() => {
        const picOwn = document.querySelector('button[aria-label*="Person-In-Charge of my own clinic"]');
        if (picOwn) picOwn.click();
        const picExt = document.querySelector('button[aria-label*="not Person-In-Charge of another facility"]');
        if (picExt) picExt.click();
      });
      await new Promise((r) => setTimeout(r, 400));

      await page.evaluate(() => {
        const switches = Array.from(document.querySelectorAll('button[role="switch"]'));
        if (switches.length > 0) switches[0].click();
      });
      await new Promise((r) => setTimeout(r, 500));
    } else {
      await page.evaluate(() => {
        const radio = document.querySelector('button[aria-label*="No, I do not own or partner"]');
        if (radio) radio.click();
      });
      await new Promise((r) => setTimeout(r, 400));

      await page.evaluate(() => {
        const radio = document.querySelector('button[aria-label*="not Person-In-Charge of another facility"]');
        if (radio) radio.click();
      });
      await new Promise((r) => setTimeout(r, 400));
    }

    // Proceed to Stage 3
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const proceedBtn = btns.find((b) => b.textContent && b.textContent.includes('Proceed to Personal Details'));
      if (proceedBtn) proceedBtn.click();
    });

    await page.waitForFunction(() => document.body.innerText.includes('Practitioner Identity & Underwriting Declarations'), {
      timeout: 10000,
    });
    await new Promise((r) => setTimeout(r, 600));
  }

  // 1. Desktop Clean Stage 3
  console.log('1. Capturing Stage 3 Clean Particulars Desktop (1440px)...');
  const page1 = await browser.newPage();
  await page1.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await navigateToStage3(page1, { ownsClinic: false });

  await page1.evaluate(() => {
    const nameInput = document.querySelector('input[placeholder*="DR MUHAMMAD SALEEM"]');
    if (nameInput) {
      nameInput.value = 'DR MUHAMMAD AZMAN BIN HARUN';
      nameInput.dispatchEvent(new Event('input', { bubbles: true }));
      nameInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const nricInput = document.querySelector('input[placeholder*="850412"]');
    if (nricInput) {
      nricInput.value = '850412-14-5231';
      nricInput.dispatchEvent(new Event('input', { bubbles: true }));
      nricInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const mmcInput = document.querySelector('input[placeholder*="54321"]');
    if (mmcInput) {
      mmcInput.value = '54321';
      mmcInput.dispatchEvent(new Event('input', { bubbles: true }));
      mmcInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const hospInput = document.querySelector('input[placeholder*="Pantai Hospital"]');
    if (hospInput) {
      hospInput.value = 'Pantai Hospital Kuala Lumpur';
      hospInput.dispatchEvent(new Event('input', { bubbles: true }));
      hospInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const addrInput = document.querySelector('input[placeholder*="Suite / Unit"]');
    if (addrInput) {
      addrInput.value = '8 Jalan Bukit Pantai, Bangsar';
      addrInput.dispatchEvent(new Event('input', { bubbles: true }));
      addrInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const postcodeInput = document.querySelector('input[placeholder*="50480"]');
    if (postcodeInput) {
      postcodeInput.value = '59100';
      postcodeInput.dispatchEvent(new Event('input', { bubbles: true }));
      postcodeInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const cityInput = document.querySelector('input[placeholder*="Kuala Lumpur"]');
    if (cityInput) {
      cityInput.value = 'Kuala Lumpur';
      cityInput.dispatchEvent(new Event('input', { bubbles: true }));
      cityInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const agreeRadio = document.querySelector('input[name="haveClaimEverBeenMade"][value="agree"]');
    if (agreeRadio) agreeRadio.click();

    const noRadios = document.querySelectorAll('input[value="no"]');
    noRadios.forEach((r) => r.click());

    const truthCheckbox = document.getElementById('final_declaration_accepted');
    if (truthCheckbox) truthCheckbox.click();
  });
  await new Promise((r) => setTimeout(r, 500));

  const tempPath1 = path.join(REPO_SCREENSHOTS, 'temp_s3_desktop.png');
  await page1.screenshot({ path: tempPath1, fullPage: true });
  saveScreenshot(tempPath1, 'stage3-particulars-clean-desktop-1440px.png');
  fs.unlinkSync(tempPath1);

  // 2. Desktop Adverse State
  console.log('2. Capturing Stage 3 Adverse Underwriting Declaration Desktop (1440px)...');
  await page1.evaluate(() => {
    const disagreeRadio = document.querySelector('input[name="haveClaimEverBeenMade"][value="disagree"]');
    if (disagreeRadio) disagreeRadio.click();
  });
  await new Promise((r) => setTimeout(r, 400));

  await page1.evaluate(() => {
    const descArea = document.getElementById('no_claim_desc');
    if (descArea) {
      descArea.value = 'Alleged delayed diagnosis in 2023 at Pantai Hospital. Claim settled out of court in April 2024 with no liability admission.';
      descArea.dispatchEvent(new Event('input', { bubbles: true }));
      descArea.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await new Promise((r) => setTimeout(r, 500));

  const tempPath2 = path.join(REPO_SCREENSHOTS, 'temp_s3_adverse.png');
  await page1.screenshot({ path: tempPath2, fullPage: true });
  saveScreenshot(tempPath2, 'stage3-underwriting-adverse-desktop-1440px.png');
  fs.unlinkSync(tempPath2);

  // 3. Desktop COVID-19 Questionnaire Expanded
  console.log('3. Capturing Stage 3 COVID-19 Risk Questionnaire Expanded (1440px)...');
  await page1.evaluate(() => {
    const banner = Array.from(document.querySelectorAll('div')).find((el) =>
      el.textContent && el.textContent.includes('Supplementary COVID-19 Facility Risk Assessment Questionnaire')
    );
    if (banner) banner.click();
  });
  await new Promise((r) => setTimeout(r, 500));

  const tempPath3 = path.join(REPO_SCREENSHOTS, 'temp_s3_covid.png');
  await page1.screenshot({ path: tempPath3, fullPage: true });
  saveScreenshot(tempPath3, 'stage3-covid-questionnaire-desktop-1440px.png');
  fs.unlinkSync(tempPath3);
  await page1.close();

  // 4. Desktop Branch Management & Revenue Ceiling (1440px)
  console.log('4. Capturing Stage 3 Branch Management Desktop (1440px)...');
  const pageBranch = await browser.newPage();
  await pageBranch.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await navigateToStage3(pageBranch, { ownsClinic: true });

  await pageBranch.evaluate(() => {
    const clinicNameInput = document.querySelector('input[placeholder*="Dr Saleem Medical Clinic"]');
    if (clinicNameInput) {
      clinicNameInput.value = 'Klinik Kesihatan Azman Sdn Bhd';
      clinicNameInput.dispatchEvent(new Event('input', { bubbles: true }));
      clinicNameInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const revCheckbox = document.querySelector('input[aria-label="Revenue eligibility declaration"]');
    if (revCheckbox) revCheckbox.click();

    const btns = Array.from(document.querySelectorAll('button'));
    const addBranchBtn = btns.find((b) => b.textContent && b.textContent.includes('Add Clinic / Branch'));
    if (addBranchBtn) addBranchBtn.click();
  });
  await new Promise((r) => setTimeout(r, 500));

  await pageBranch.evaluate(() => {
    const bName = document.getElementById('branch-name');
    if (bName) {
      bName.value = 'Klinik Azman - Bangsar Branch';
      bName.dispatchEvent(new Event('input', { bubbles: true }));
    }
    const bAddr = document.getElementById('branch-address');
    if (bAddr) {
      bAddr.value = '12 Jalan Telawi 3';
      bAddr.dispatchEvent(new Event('input', { bubbles: true }));
    }
    const bPostcode = document.getElementById('branch-postcode');
    if (bPostcode) {
      bPostcode.value = '59100';
      bPostcode.dispatchEvent(new Event('input', { bubbles: true }));
    }
    const bCity = document.getElementById('branch-city');
    if (bCity) {
      bCity.value = 'Kuala Lumpur';
      bCity.dispatchEvent(new Event('input', { bubbles: true }));
    }
    const bPhone = document.getElementById('branch-phone');
    if (bPhone) {
      bPhone.value = '03-22841234';
      bPhone.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  await new Promise((r) => setTimeout(r, 500));

  const tempPath4 = path.join(REPO_SCREENSHOTS, 'temp_s3_branch.png');
  await pageBranch.screenshot({ path: tempPath4, fullPage: true });
  saveScreenshot(tempPath4, 'stage3-particulars-branches-desktop-1440px.png');
  fs.unlinkSync(tempPath4);
  await pageBranch.close();

  // 5. Accessible Validation Error State (1440px)
  console.log('5. Capturing Stage 3 Validation Error State (1440px)...');
  const pageErrors = await browser.newPage();
  await pageErrors.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await navigateToStage3(pageErrors, { ownsClinic: false });

  await pageErrors.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const submitBtn = btns.find((b) => b.textContent && b.textContent.includes('Proceed to Review & Payment'));
    if (submitBtn) submitBtn.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  const tempPath5 = path.join(REPO_SCREENSHOTS, 'temp_s3_errors.png');
  await pageErrors.screenshot({ path: tempPath5, fullPage: true });
  saveScreenshot(tempPath5, 'stage3-validation-errors-desktop-1440px.png');
  fs.unlinkSync(tempPath5);
  await pageErrors.close();

  // 6. Tablet Responsive Stage 3 (768px)
  console.log('6. Capturing Stage 3 Tablet Responsive (768px)...');
  const pageTablet = await browser.newPage();
  await pageTablet.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await navigateToStage3(pageTablet, { ownsClinic: false });
  await new Promise((r) => setTimeout(r, 500));

  const tempPath6 = path.join(REPO_SCREENSHOTS, 'temp_s3_tablet.png');
  await pageTablet.screenshot({ path: tempPath6, fullPage: true });
  saveScreenshot(tempPath6, 'stage3-particulars-tablet-768px.png');
  fs.unlinkSync(tempPath6);
  await pageTablet.close();

  // 7. Mobile Responsive Stage 3 (390px)
  console.log('7. Capturing Stage 3 Mobile Responsive (390px)...');
  const pageMobile = await browser.newPage();
  await pageMobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await navigateToStage3(pageMobile, { ownsClinic: false });
  await new Promise((r) => setTimeout(r, 500));

  const tempPath7 = path.join(REPO_SCREENSHOTS, 'temp_s3_mobile.png');
  await pageMobile.screenshot({ path: tempPath7, fullPage: true });
  saveScreenshot(tempPath7, 'stage3-particulars-mobile-390px.png');
  fs.unlinkSync(tempPath7);
  await pageMobile.close();

  await browser.close();
  console.log('Stage 3 screenshot capture complete!');
}

capture().catch((err) => {
  console.error('Error during Stage 3 screenshot capture:', err);
  process.exit(1);
});
