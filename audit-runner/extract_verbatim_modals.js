const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://my-individualindemnity.doctorshield.com/', { waitUntil: 'networkidle2' });

  const modalDetails = await page.evaluate(() => {
    const modals = [
      '#jsImportantAndNoticesModel',
      '#jsBackDateEnableModel',
      '#periodEndDateInfo',
      '#jsTaxDisplayModel',
      '#jsCalculatePageEditModal',
      '#jsBranchModal',
      '#specializationModal',
      '#intro_modal',
      '#jsCookiePopupModel',
      '#jsStartDateValidationErrorModal',
      '#jsServerSideErrorModal',
      '#jsContactUsNegativeQuoteErrorModel',
      '#jsReIncompleteQuoteErrorModel',
      '#jsExpireContactusQuoteErrorModel',
      '#jsNewPromocodeChangeModel',
      '#mailRenewModal',
      '#jsFormRenewModal',
      '#jsInitialClaimFormModal',
      '#jsUserPolicyList',
      '#jsEmailErrorModel',
      '#jsAlreadyBoughtModal',
      '#jsReIndicativeQuoteErrorModel'
    ];

    const result = {};
    modals.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) {
        result[sel] = {
          html: el.innerHTML,
          text: el.innerText.trim()
        };
      }
    });

    // Also get the full text of disclosures and tooltips from the main pages
    result['page1_disclosures'] = {
      pidm: document.querySelector('.pidm-text, [class*="pidm"], [class*="tips"]')?.innerText?.trim() || '',
      terms: document.querySelector('#jsContactTermsAndCondition')?.closest('div, label')?.innerText?.trim() || ''
    };

    result['retroactive_notice_page10'] = {
      text: document.querySelector('#jsPage10')?.innerText?.trim() || ''
    };

    return result;
  });

  fs.writeFileSync('c:/Users/salee/Downloads/Portal_ds/docs/evidence/modal-raw-texts.json', JSON.stringify(modalDetails, null, 2));
  console.log('Saved modal-raw-texts.json');

  await browser.close();
}

main().catch(console.error);

