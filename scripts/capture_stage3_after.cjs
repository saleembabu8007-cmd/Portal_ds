const puppeteer = require('../audit-runner/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const REPO_SCREENSHOTS = path.join(__dirname, '..', 'docs', 'evidence', 'screenshots');
const ARTIFACT_SCREENSHOTS = 'C:\\Users\\salee\\.gemini\\antigravity\\brain\\54b8aedc-dd01-4226-9a0a-224ea04249be\\screenshots';
const ARTIFACT_ROOT = 'C:\\Users\\salee\\.gemini\\antigravity\\brain\\54b8aedc-dd01-4226-9a0a-224ea04249be';

[REPO_SCREENSHOTS, ARTIFACT_SCREENSHOTS].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

async function capture() {
  console.log('Launching headless Chrome for Stage 3 After capture...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // 1. SIMPLE JOURNEY - DESKTOP (1440px)
  console.log('--- 1. Simple Journey Desktop (1440px) ---');
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await desktopPage.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1000));

  // Fill Stage 1
  await desktopPage.type('input[type="email"]', 'dr.saleem@chubb.com.my');
  await desktopPage.click('input[type="checkbox"]');
  await desktopPage.evaluate(() => {
    document.querySelector('button[type="submit"]')?.click();
  });

  // Wait for Stage 2
  await desktopPage.waitForFunction(
    () => document.body.innerText.includes('Your Indicative Chubb Indemnity Quote'),
    { timeout: 10000 }
  );
  await new Promise((r) => setTimeout(r, 1000));

  // Stage 2 - Non-clinic answers
  await desktopPage.evaluate(() => {
    const radios = Array.from(document.querySelectorAll('button[role="radio"]'));
    const noClinic = radios.find((r) => r.getAttribute('aria-label')?.includes('No, I do not own'));
    if (noClinic) noClinic.click();
    const noPicOwn = radios.find((r) => r.getAttribute('aria-label')?.includes('No, not Person-In-Charge of own'));
    if (noPicOwn) noPicOwn.click();
    const noPicExt = radios.find((r) => r.getAttribute('aria-label')?.includes('No, not Person-In-Charge of another'));
    if (noPicExt) noPicExt.click();
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Click "Proceed to Personal Details"
  await desktopPage.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const proceedBtn = buttons.find((b) => b.innerText.includes('Proceed to Personal Details'));
    if (proceedBtn) proceedBtn.click();
  });

  // Wait for Stage 3 Heading
  await desktopPage.waitForFunction(
    () => document.body.innerText.includes('Practitioner Identity & Underwriting Declarations'),
    { timeout: 10000 }
  );
  await new Promise((r) => setTimeout(r, 1000));

  // Fill in some standard practitioner details for realistic rendering
  await desktopPage.evaluate(() => {
    const fullNameInput = Array.from(document.querySelectorAll('input')).find((i) => i.placeholder?.includes('MUHAMMAD'));
    if (fullNameInput) {
      fullNameInput.value = 'DR MUHAMMAD SALEEM BIN ABDULLAH';
      fullNameInput.dispatchEvent(new Event('input', { bubbles: true }));
      fullNameInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const nricInput = Array.from(document.querySelectorAll('input')).find((i) => i.placeholder?.includes('850412'));
    if (nricInput) {
      nricInput.value = '850412-14-5231';
      nricInput.dispatchEvent(new Event('input', { bubbles: true }));
      nricInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const mmcInput = Array.from(document.querySelectorAll('input')).find((i) => i.placeholder?.includes('54321'));
    if (mmcInput) {
      mmcInput.value = '54321';
      mmcInput.dispatchEvent(new Event('input', { bubbles: true }));
      mmcInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const locInput = Array.from(document.querySelectorAll('input')).find((i) => i.placeholder?.includes('Pantai Hospital'));
    if (locInput) {
      locInput.value = 'Pantai Hospital Kuala Lumpur';
      locInput.dispatchEvent(new Event('input', { bubbles: true }));
      locInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await new Promise((r) => setTimeout(r, 500));

  const desktopSimpleRepo = path.join(REPO_SCREENSHOTS, 'stage3-after-desktop-1440px.png');
  const desktopSimpleArtifact = path.join(ARTIFACT_SCREENSHOTS, 'stage3-after-desktop-1440px.png');
  const desktopSimpleRoot = path.join(ARTIFACT_ROOT, 'stage3-after-desktop-1440px.png');

  await desktopPage.screenshot({ path: desktopSimpleRepo, fullPage: true });
  fs.copyFileSync(desktopSimpleRepo, desktopSimpleArtifact);
  fs.copyFileSync(desktopSimpleRepo, desktopSimpleRoot);
  console.log('Saved Stage 3 After Desktop Screenshot:', desktopSimpleArtifact);

  // 2. SIMPLE JOURNEY - MOBILE (390px)
  console.log('--- 2. Simple Journey Mobile (390px) ---');
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await mobilePage.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1000));

  await mobilePage.type('input[type="email"]', 'dr.saleem@chubb.com.my');
  await mobilePage.click('input[type="checkbox"]');
  await mobilePage.evaluate(() => {
    document.querySelector('button[type="submit"]')?.click();
  });

  await mobilePage.waitForFunction(
    () => document.body.innerText.includes('Your Indicative Chubb Indemnity Quote'),
    { timeout: 10000 }
  );
  await new Promise((r) => setTimeout(r, 1000));

  await mobilePage.evaluate(() => {
    const radios = Array.from(document.querySelectorAll('button[role="radio"]'));
    const noClinic = radios.find((r) => r.getAttribute('aria-label')?.includes('No, I do not own'));
    if (noClinic) noClinic.click();
    const noPicOwn = radios.find((r) => r.getAttribute('aria-label')?.includes('No, not Person-In-Charge of own'));
    if (noPicOwn) noPicOwn.click();
    const noPicExt = radios.find((r) => r.getAttribute('aria-label')?.includes('No, not Person-In-Charge of another'));
    if (noPicExt) noPicExt.click();
  });
  await new Promise((r) => setTimeout(r, 1200));

  await mobilePage.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const proceedBtn = buttons.find((b) => b.innerText.includes('Proceed to Personal Details'));
    if (proceedBtn) proceedBtn.click();
  });

  await mobilePage.waitForFunction(
    () => document.body.innerText.includes('Practitioner Identity & Underwriting Declarations'),
    { timeout: 10000 }
  );
  await new Promise((r) => setTimeout(r, 1000));

  const mobileSimpleRepo = path.join(REPO_SCREENSHOTS, 'stage3-after-mobile-390px.png');
  const mobileSimpleArtifact = path.join(ARTIFACT_SCREENSHOTS, 'stage3-after-mobile-390px.png');
  const mobileSimpleRoot = path.join(ARTIFACT_ROOT, 'stage3-after-mobile-390px.png');

  await mobilePage.screenshot({ path: mobileSimpleRepo, fullPage: true });
  fs.copyFileSync(mobileSimpleRepo, mobileSimpleArtifact);
  fs.copyFileSync(mobileSimpleRepo, mobileSimpleRoot);
  console.log('Saved Stage 3 After Mobile Screenshot:', mobileSimpleArtifact);

  // 3. COMPLEX JOURNEY - DESKTOP (1440px)
  // (Clinic owner with branch + adverse declaration details revealed)
  console.log('--- 3. Complex Journey Desktop (1440px) ---');
  const complexPage = await browser.newPage();
  await complexPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await complexPage.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1000));

  await complexPage.type('input[type="email"]', 'dr.clinic.owner@chubb.com.my');
  await complexPage.click('input[type="checkbox"]');
  await complexPage.evaluate(() => {
    document.querySelector('button[type="submit"]')?.click();
  });

  await complexPage.waitForFunction(
    () => document.body.innerText.includes('Your Indicative Chubb Indemnity Quote'),
    { timeout: 10000 }
  );
  await new Promise((r) => setTimeout(r, 1000));

  // Toggle YES to Clinic in Stage 2 with proper options
  await complexPage.evaluate(() => {
    const radios = Array.from(document.querySelectorAll('button[role="radio"]'));
    const yesClinic = radios.find((r) => r.getAttribute('aria-label')?.includes('Yes, I own or partner'));
    if (yesClinic) yesClinic.click();
  });
  await new Promise((r) => setTimeout(r, 800));

  // Select Sole Proprietor & Locums No & PIC questions
  await complexPage.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const soleProp = buttons.find((b) => b.innerText.includes('Sole Proprietor'));
    if (soleProp) soleProp.click();

    const radios = Array.from(document.querySelectorAll('button[role="radio"]'));
    const yesPicOwn = radios.find((r) => r.getAttribute('aria-label')?.includes('Yes, I am Person-In-Charge of my own'));
    if (yesPicOwn) yesPicOwn.click();
    const noPicExt = radios.find((r) => r.getAttribute('aria-label')?.includes('No, not Person-In-Charge of another'));
    if (noPicExt) noPicExt.click();
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Proceed to Stage 3
  await complexPage.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const proceedBtn = buttons.find((b) => b.innerText.includes('Proceed to Personal Details'));
    if (proceedBtn) proceedBtn.click();
  });

  await complexPage.waitForFunction(
    () => document.body.innerText.includes('Practitioner Identity & Underwriting Declarations'),
    { timeout: 10000 }
  );
  await new Promise((r) => setTimeout(r, 1000));

  // In Stage 3, populate clinic particulars, add branch, and trigger adverse declaration
  await complexPage.evaluate(() => {
    // Fill Full Name
    const nameInput = Array.from(document.querySelectorAll('input')).find((i) => i.placeholder?.includes('MUHAMMAD'));
    if (nameInput) {
      nameInput.value = 'DR MUHAMMAD SALEEM BIN ABDULLAH';
      nameInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    // Fill Clinic Legal Entity Name
    const clinicInput = Array.from(document.querySelectorAll('input')).find((i) => i.placeholder?.includes('Dr Saleem Medical Clinic'));
    if (clinicInput) {
      clinicInput.value = 'Klinik Dr Saleem & Rakan-Rakan Sdn Bhd';
      clinicInput.dispatchEvent(new Event('input', { bubbles: true }));
      clinicInput.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Trigger Disagree on Claims declaration to reveal progressive textarea
    const disagreeRadio = Array.from(document.querySelectorAll('input[type="radio"]')).find((r) => r.value === 'disagree');
    if (disagreeRadio) {
      disagreeRadio.click();
    }
  });
  await new Promise((r) => setTimeout(r, 600));

  // Fill in claim details in revealed textarea
  await complexPage.evaluate(() => {
    const claimTextarea = document.getElementById('no_claim_desc');
    if (claimTextarea) {
      claimTextarea.value = 'Settled claim in 2023 regarding alleged delayed referral; settled amicably with no admission of liability.';
      claimTextarea.dispatchEvent(new Event('input', { bubbles: true }));
      claimTextarea.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await new Promise((r) => setTimeout(r, 500));

  const desktopComplexRepo = path.join(REPO_SCREENSHOTS, 'stage3-after-complex-desktop-1440px.png');
  const desktopComplexArtifact = path.join(ARTIFACT_SCREENSHOTS, 'stage3-after-complex-desktop-1440px.png');
  const desktopComplexRoot = path.join(ARTIFACT_ROOT, 'stage3-after-complex-desktop-1440px.png');

  await complexPage.screenshot({ path: desktopComplexRepo, fullPage: true });
  fs.copyFileSync(desktopComplexRepo, desktopComplexArtifact);
  fs.copyFileSync(desktopComplexRepo, desktopComplexRoot);
  console.log('Saved Stage 3 After Complex Desktop Screenshot:', desktopComplexArtifact);

  await browser.close();
  console.log('All Stage 3 screenshots captured successfully!');
}

capture().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
