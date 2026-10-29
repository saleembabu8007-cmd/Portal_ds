const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Listen to requests/responses to see what happens on classification change
  page.on('response', async res => {
    const url = res.url();
    if (url.includes('api') || url.includes('liability') || url.includes('calculate') || url.includes('premium')) {
      console.log('API Response:', res.status(), url);
      try {
        const text = await res.text();
        console.log('Body:', text.substring(0, 300));
      } catch (e) {}
    }
  });

  await page.goto('https://my-individualindemnity.doctorshield.com/', { waitUntil: 'networkidle2' });

  // Get script sources
  const scripts = await page.evaluate(() => {
    return [...document.querySelectorAll('script[src]')].map(s => s.src);
  });
  console.log('Scripts:', scripts);

  // Check what happens when classification is selected
  // Let's test classification "7" (General Medical Practitioner)
  console.log('Selecting classification 7...');
  await page.select('#classification_id', '7');
  await new Promise(r => setTimeout(r, 2000));

  // Check liability options now
  const liabilityOptions = await page.evaluate(() => {
    const sel = document.querySelector('#liability_id');
    return sel ? [...sel.options].map(o => ({ v: o.value, t: o.text })) : null;
  });
  console.log('Liability options for GP (7):', liabilityOptions);

  // Check other classifications:
  const testClassifications = ['5', '13', '15', '20'];
  for (const cid of testClassifications) {
    await page.select('#classification_id', cid);
    await new Promise(r => setTimeout(r, 1000));
    const opts = await page.evaluate(() => {
      const sel = document.querySelector('#liability_id');
      return sel ? [...sel.options].map(o => ({ v: o.value, t: o.text })) : null;
    });
    console.log(`Liability options for (${cid}):`, opts);
  }

  // Check step containers and wizard structure
  const wizardStructure = await page.evaluate(() => {
    // Look for steps, fieldsets, tab-panes, pages
    const sections = [...document.querySelectorAll('[id*="step"], [class*="step"], [id*="page"], [class*="page"], fieldset, form')];
    return sections.map(s => ({
      tag: s.tagName,
      id: s.id,
      className: s.className,
      display: getComputedStyle(s).display,
      visibility: getComputedStyle(s).visibility
    })).filter(s => s.id || s.className);
  });
  console.log('\nWizard Structure / Steps:');
  console.log(JSON.stringify(wizardStructure, null, 2));

  await browser.close();
}

main().catch(console.error);

