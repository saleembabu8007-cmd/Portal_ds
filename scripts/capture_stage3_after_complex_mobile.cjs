const puppeteer = require('../audit-runner/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const REPO_SCREENSHOTS = path.join(__dirname, '..', 'docs', 'evidence', 'screenshots');
const ARTIFACT_SCREENSHOTS = 'C:\\Users\\salee\\.gemini\\antigravity\\brain\\54b8aedc-dd01-4226-9a0a-224ea04249be\\screenshots';
const ARTIFACT_ROOT = 'C:\\Users\\salee\\.gemini\\antigravity\\brain\\54b8aedc-dd01-4226-9a0a-224ea04249be';

async function capture() {
  console.log('Capturing Stage 3 After Complex Mobile...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await mobilePage.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1000));

  await mobilePage.type('input[type="email"]', 'dr.clinic.owner@chubb.com.my');
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
    const yesClinic = radios.find((r) => r.getAttribute('aria-label')?.includes('Yes, I own or partner'));
    if (yesClinic) yesClinic.click();
  });
  await new Promise((r) => setTimeout(r, 800));

  await mobilePage.evaluate(() => {
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

  await mobilePage.evaluate(() => {
    const nameInput = Array.from(document.querySelectorAll('input')).find((i) => i.placeholder?.includes('MUHAMMAD'));
    if (nameInput) {
      nameInput.value = 'DR MUHAMMAD SALEEM BIN ABDULLAH';
      nameInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    const clinicInput = Array.from(document.querySelectorAll('input')).find((i) => i.placeholder?.includes('Dr Saleem Medical Clinic'));
    if (clinicInput) {
      clinicInput.value = 'Klinik Dr Saleem & Rakan-Rakan Sdn Bhd';
      clinicInput.dispatchEvent(new Event('input', { bubbles: true }));
      clinicInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const disagreeRadio = Array.from(document.querySelectorAll('input[type="radio"]')).find((r) => r.value === 'disagree');
    if (disagreeRadio) {
      disagreeRadio.click();
    }
  });
  await new Promise((r) => setTimeout(r, 600));

  await mobilePage.evaluate(() => {
    const claimTextarea = document.getElementById('no_claim_desc');
    if (claimTextarea) {
      claimTextarea.value = 'Settled claim in 2023 regarding alleged delayed referral; settled amicably.';
      claimTextarea.dispatchEvent(new Event('input', { bubbles: true }));
      claimTextarea.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await new Promise((r) => setTimeout(r, 500));

  const mobileComplexRepo = path.join(REPO_SCREENSHOTS, 'stage3-after-complex-mobile-390px.png');
  const mobileComplexArtifact = path.join(ARTIFACT_SCREENSHOTS, 'stage3-after-complex-mobile-390px.png');
  const mobileComplexRoot = path.join(ARTIFACT_ROOT, 'stage3-after-complex-mobile-390px.png');

  await mobilePage.screenshot({ path: mobileComplexRepo, fullPage: true });
  fs.copyFileSync(mobileComplexRepo, mobileComplexArtifact);
  fs.copyFileSync(mobileComplexRepo, mobileComplexRoot);
  console.log('Saved Stage 3 After Complex Mobile Screenshot:', mobileComplexArtifact);

  await browser.close();
}

capture().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});

