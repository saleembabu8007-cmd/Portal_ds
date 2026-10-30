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
  console.log('Launching headless Chrome for Stage 4 & 5 Before capture...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await desktopPage.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1000));

  // Stage 1
  await desktopPage.type('input[type="email"]', 'dr.saleem@chubb.com.my');
  await desktopPage.click('input[type="checkbox"]');
  await desktopPage.evaluate(() => {
    document.querySelector('button[type="submit"]')?.click();
  });

  // Stage 2
  await desktopPage.waitForFunction(
    () => document.body.innerText.includes('Your Indicative Chubb Indemnity Quote'),
    { timeout: 10000 }
  );
  await new Promise((r) => setTimeout(r, 800));

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

  await desktopPage.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const proceedBtn = buttons.find((b) => b.innerText.includes('Proceed to Personal Details'));
    if (proceedBtn) proceedBtn.click();
  });

  // Stage 3
  await desktopPage.waitForFunction(
    () => document.body.innerText.includes('Practitioner Identity & Underwriting Declarations'),
    { timeout: 10000 }
  );
  await new Promise((r) => setTimeout(r, 800));

  // Type using native puppeteer typing so React onChange fires cleanly
  const fullNameField = await desktopPage.$('input[placeholder*="MUHAMMAD"]');
  if (fullNameField) await fullNameField.type('DR MUHAMMAD SALEEM BIN ABDULLAH');

  const nricField = await desktopPage.$('input[placeholder*="850412"]');
  if (nricField) await nricField.type('850412145231');

  const mmcField = await desktopPage.$('input[placeholder*="54321"]');
  if (mmcField) await mmcField.type('54321');

  const phoneField = await desktopPage.$('input[type="tel"]');
  if (phoneField) await phoneField.type('0123456789');

  const locField = await desktopPage.$('input[placeholder*="Pantai Hospital"]');
  if (locField) await locField.type('Pantai Hospital Kuala Lumpur');

  const addrField = await desktopPage.$('input[placeholder*="Suite"]');
  if (addrField) await addrField.type('8 Jalan Bukit Pantai');

  const postcodeField = await desktopPage.$('input[placeholder="50480"]');
  if (postcodeField) await postcodeField.type('59100');

  const cityField = await desktopPage.$('input[placeholder="Kuala Lumpur"]');
  if (cityField) await cityField.type('Kuala Lumpur');

  // Select state & income and answer radios
  await desktopPage.evaluate(() => {
    const selects = Array.from(document.querySelectorAll('select'));
    const stateSelect = selects.find((s) => s.innerHTML.includes('Wilayah Persekutuan Kuala Lumpur'));
    if (stateSelect) {
      stateSelect.value = 'Wilayah Persekutuan Kuala Lumpur';
      stateSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const incomeSelect = selects.find((s) => s.innerHTML.includes('RM 250,000 - RM 500,000'));
    if (incomeSelect) {
      incomeSelect.value = 'RM 250,000 - RM 500,000';
      incomeSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Underwriting clean
    const agreeRadio = Array.from(document.querySelectorAll('input[type="radio"]')).find((r) => r.value === 'agree');
    if (agreeRadio) agreeRadio.click();

    const noRadios = Array.from(document.querySelectorAll('input[type="radio"]')).filter((r) => r.value === 'no');
    noRadios.forEach((r) => r.click());

    const finalDecl = document.getElementById('final_declaration_accepted');
    if (finalDecl) finalDecl.click();
  });
  await new Promise((r) => setTimeout(r, 800));

  // Submit Stage 3
  await desktopPage.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const proceedBtn = buttons.find((b) => b.innerText.includes('Proceed to Review & Payment'));
    if (proceedBtn) proceedBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1200));

  const alertError = await desktopPage.evaluate(() => document.querySelector('[role="alert"]')?.innerText);
  if (alertError) {
    console.log('Stage 3 Validation Error:', alertError);
  }

  // Wait for Stage 4 Heading
  await desktopPage.waitForFunction(
    () => document.body.innerText.includes('Review Policy Details & Authorize Payment'),
    { timeout: 10000 }
  );
  await new Promise((r) => setTimeout(r, 1000));

  const desktop4Repo = path.join(REPO_SCREENSHOTS, 'stage4-before-desktop-1440px.png');
  const desktop4Artifact = path.join(ARTIFACT_SCREENSHOTS, 'stage4-before-desktop-1440px.png');
  const desktop4Root = path.join(ARTIFACT_ROOT, 'stage4-before-desktop-1440px.png');

  await desktopPage.screenshot({ path: desktop4Repo, fullPage: true });
  fs.copyFileSync(desktop4Repo, desktop4Artifact);
  fs.copyFileSync(desktop4Repo, desktop4Root);
  console.log('Saved Stage 4 Before Desktop Screenshot:', desktop4Artifact);

  // 2. Stage 4 Mobile (390px)
  console.log('--- 2. Stage 4 Mobile (390px) ---');
  await desktopPage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await new Promise((r) => setTimeout(r, 600));

  const mobile4Repo = path.join(REPO_SCREENSHOTS, 'stage4-before-mobile-390px.png');
  const mobile4Artifact = path.join(ARTIFACT_SCREENSHOTS, 'stage4-before-mobile-390px.png');
  const mobile4Root = path.join(ARTIFACT_ROOT, 'stage4-before-mobile-390px.png');

  await desktopPage.screenshot({ path: mobile4Repo, fullPage: true });
  fs.copyFileSync(mobile4Repo, mobile4Artifact);
  fs.copyFileSync(mobile4Repo, mobile4Root);
  console.log('Saved Stage 4 Before Mobile Screenshot:', mobile4Artifact);

  // Now trigger checkout success to get Stage 5 Before screenshots!
  console.log('--- 3. Stage 5 Confirmation Before ---');
  await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await new Promise((r) => setTimeout(r, 500));

  await desktopPage.evaluate(() => {
    document.getElementById('consent_policy_wording')?.click();
    document.getElementById('consent_duty_of_disclosure')?.click();
    document.getElementById('consent_pdpa')?.click();
  });
  await new Promise((r) => setTimeout(r, 500));

  await desktopPage.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const payBtn = buttons.find((b) => b.innerText.includes('Authorize & Pay'));
    if (payBtn) payBtn.click();
  });

  await desktopPage.waitForFunction(
    () => document.body.innerText.includes('Secure Checkout Gateway'),
    { timeout: 10000 }
  );
  await new Promise((r) => setTimeout(r, 500));

  // Simulate success
  await desktopPage.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const successBtn = buttons.find((b) => b.innerText.includes('Simulate Success'));
    if (successBtn) successBtn.click();
  });

  await desktopPage.waitForFunction(
    () => document.body.innerText.includes('Your Indemnity Coverage is Active'),
    { timeout: 10000 }
  );
  await new Promise((r) => setTimeout(r, 1000));

  const desktop5Repo = path.join(REPO_SCREENSHOTS, 'stage5-before-desktop-1440px.png');
  const desktop5Artifact = path.join(ARTIFACT_SCREENSHOTS, 'stage5-before-desktop-1440px.png');
  const desktop5Root = path.join(ARTIFACT_ROOT, 'stage5-before-desktop-1440px.png');

  await desktopPage.screenshot({ path: desktop5Repo, fullPage: true });
  fs.copyFileSync(desktop5Repo, desktop5Artifact);
  fs.copyFileSync(desktop5Repo, desktop5Root);
  console.log('Saved Stage 5 Before Desktop Screenshot:', desktop5Artifact);

  await desktopPage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await new Promise((r) => setTimeout(r, 600));

  const mobile5Repo = path.join(REPO_SCREENSHOTS, 'stage5-before-mobile-390px.png');
  const mobile5Artifact = path.join(ARTIFACT_SCREENSHOTS, 'stage5-before-mobile-390px.png');
  const mobile5Root = path.join(ARTIFACT_ROOT, 'stage5-before-mobile-390px.png');

  await desktopPage.screenshot({ path: mobile5Repo, fullPage: true });
  fs.copyFileSync(mobile5Repo, mobile5Artifact);
  fs.copyFileSync(mobile5Repo, mobile5Root);
  console.log('Saved Stage 5 Before Mobile Screenshot:', mobile5Artifact);

  await browser.close();
  console.log('All Before screenshots for Stage 4 & 5 captured successfully!');
}

capture().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
