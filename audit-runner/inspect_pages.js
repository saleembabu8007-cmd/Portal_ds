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

  // Get details of all page divs
  const pagesInfo = await page.evaluate(() => {
    const pageDivs = [...document.querySelectorAll('[id^="jsPage"], [id="jsContact"], [id^="jsModal"], .modal')];
    return pageDivs.map(el => {
      const texts = [...el.querySelectorAll('h1, h2, h3, h4, h5, p, label, .title, [class*="title"], [class*="error"]')]
        .map(t => ({ tag: t.tagName, cls: t.className, text: t.innerText.trim() }))
        .filter(t => t.text.length > 0 && t.text.length < 300);

      const buttons = [...el.querySelectorAll('button, a.btn, input[type="button"], input[type="submit"]')]
        .map(b => ({ text: b.innerText.trim() || b.value, cls: b.className, id: b.id }));

      const inputs = [...el.querySelectorAll('input:not([type="hidden"]), select, textarea')]
        .map(i => ({
          tag: i.tagName,
          id: i.id,
          name: i.name,
          type: i.type,
          placeholder: i.placeholder,
          label: (document.querySelector(`label[for="${i.id}"]`) || i.closest('label'))?.innerText?.trim() || ''
        }));

      return {
        id: el.id,
        className: el.className,
        texts: texts.slice(0, 30),
        buttons,
        inputs
      };
    });
  });

  fs.writeFileSync('c:/Users/salee/Downloads/Portal_ds/docs/evidence/page-divs.json', JSON.stringify(pagesInfo, null, 2));
  console.log(`Saved ${pagesInfo.length} page/modal containers to page-divs.json`);

  await browser.close();
}

main().catch(console.error);

