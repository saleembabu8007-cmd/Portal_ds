const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const JS_DIR = path.resolve('c:/Users/salee/Downloads/Portal_ds/docs/evidence/scripts');
fs.mkdirSync(JS_DIR, { recursive: true });

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Download scripts directly via page.evaluate fetch
  await page.goto('https://my-individualindemnity.doctorshield.com/', { waitUntil: 'networkidle2' });

  const scriptsToDownload = [
    'https://my-individualindemnity.doctorshield.com/assets/js/home.min.js',
    'https://my-individualindemnity.doctorshield.com/assets/js/common-frontend.min.js',
    'https://my-individualindemnity.doctorshield.com/assets/js/tracking.min.js'
  ];

  for (const sUrl of scriptsToDownload) {
    const filename = path.basename(new URL(sUrl).pathname);
    console.log(`Fetching ${filename}...`);
    try {
      const content = await page.evaluate(async (url) => {
        const resp = await fetch(url);
        return await resp.text();
      }, sUrl);
      fs.writeFileSync(path.join(JS_DIR, filename), content);
      console.log(`Saved ${filename} (${content.length} bytes)`);
    } catch (e) {
      console.error(`Failed to fetch ${filename}:`, e.message);
    }
  }

  // Also extract window configuration variables (e.g. CSRF, base URLs, tax rates, SST)
  const windowConfig = await page.evaluate(() => {
    const win = {};
    for (const key of Object.keys(window)) {
      if (['baseUrl', 'base_url', 'csrf_token', 'tax', 'sst', 'stamp', 'stamp_duty', 'config', 'appConfig', 'insurance'].some(k => key.toLowerCase().includes(k))) {
        win[key] = window[key];
      }
    }
    // Also check any inline script content
    const inlines = [...document.querySelectorAll('script:not([src])')].map(s => s.innerText);
    return { win, inlines };
  });

  fs.writeFileSync(path.join(JS_DIR, 'window-config.json'), JSON.stringify(windowConfig, null, 2));
  console.log('Saved window-config.json');

  await browser.close();
}

main().catch(console.error);

