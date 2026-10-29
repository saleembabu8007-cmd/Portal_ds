/**
 * DoctorShield Portal Forensic Audit — v2
 * READ-ONLY. No real data, no OTP, no payment.
 */

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOT_DIR = path.resolve(__dirname, '..', 'docs', 'evidence', 'screenshots');
const NETWORK_DIR   = path.resolve(__dirname, '..', 'docs', 'evidence', 'network');

fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
fs.mkdirSync(NETWORK_DIR,   { recursive: true });

const BASE_URL = 'https://my-individualindemnity.doctorshield.com/';

const audit = { screens: [], networkEvents: [], findings: [], internalLinks: [] };
let idx = 1;

const sleep = ms => new Promise(r => setTimeout(r, ms));

function log(tag, msg) { console.log(`[${tag}] ${msg}`); }

async function shot(page, slug, desc) {
  const n = String(idx++).padStart(3,'0');
  const fname = `SCR-${n}_${slug}.png`;
  const fpath = path.join(SCREENSHOT_DIR, fname);
  try {
    await page.screenshot({ path: fpath, fullPage: true });
    log('📸', `${fname} — ${desc}`);
    audit.screens.push({ screenshotId: `SCR-${n}`, file: fname, desc, url: page.url() });
    return `SCR-${n}`;
  } catch (e) {
    log('⚠️', `Screenshot failed: ${e.message}`);
    return null;
  }
}

async function struct(page) {
  try {
    return await page.evaluate(() => {
      const T = el => (el ? el.innerText.trim() : '');
      const qs  = s => [...document.querySelectorAll(s)];
      return {
        url:   location.href,
        title: document.title,
        h1:    qs('h1').map(T).filter(Boolean),
        h2:    qs('h2').map(T).filter(Boolean),
        h3:    qs('h3').map(T).filter(Boolean),
        p:     qs('p').map(T).filter(Boolean).slice(0,30),
        labels: qs('label').map(T).filter(Boolean),
        buttons: qs('button, [role="button"], input[type="submit"]').map(el => ({
          text: T(el) || el.value || el.getAttribute('aria-label') || '',
          disabled: el.disabled,
          type: el.type
        })).filter(b=>b.text),
        links: qs('a[href]').map(el=>({ text:T(el), href: el.href })).filter(l=>l.text).slice(0,40),
        inputs: qs('input, select, textarea').map(el => {
          const lbl = document.querySelector(`label[for="${el.id}"]`);
          return {
            tag:  el.tagName.toLowerCase(),
            type: el.type,
            id:   el.id,
            name: el.name,
            placeholder: el.placeholder,
            required:    el.required,
            value:       el.value,
            label:       T(lbl),
            options:     el.tagName==='SELECT' ? [...el.options].map(o=>({v:o.value,t:o.text})) : undefined
          };
        }),
        checkboxes: qs('input[type="checkbox"]').map(el => {
          const lbl = document.querySelector(`label[for="${el.id}"]`) || el.closest('label');
          return { id:el.id, name:el.name, checked:el.checked, label: T(lbl) };
        }),
        radios: qs('input[type="radio"]').map(el => {
          const lbl = document.querySelector(`label[for="${el.id}"]`) || el.closest('label');
          return { id:el.id, name:el.name, value:el.value, checked:el.checked, label: T(lbl) };
        }),
        bodyText: document.body.innerText.substring(0,8000),
        cssVars: (() => {
          const v={};
          try { for(const sheet of document.styleSheets) {
            try { for(const rule of sheet.cssRules) {
              if(rule.selectorText===':root') for(const p of rule.style) if(p.startsWith('--')) v[p]=rule.style.getPropertyValue(p).trim();
            }} catch(e){}
          }} catch(e){}
          return v;
        })(),
        fonts: [...new Set([...document.querySelectorAll('*')].map(el=>getComputedStyle(el).fontFamily).filter(Boolean))].slice(0,15),
        lang: document.documentElement.lang,
        hasSkipLink: !!document.querySelector('a[href="#main"],a[href="#content"],a[href="#skip"]'),
        metaViewport: document.querySelector('meta[name="viewport"]')?.content||'',
        imgAltMissing: [...document.querySelectorAll('img')].filter(i=>!i.alt).length,
        totalImgs: document.querySelectorAll('img').length,
        inputsMissingLabel: [...document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"])')].filter(el=>{
          return !document.querySelector(`label[for="${el.id}"]`) && !el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby');
        }).length
      };
    });
  } catch (e) {
    log('⚠️', `struct() failed: ${e.message}`);
    return { error: e.message };
  }
}

async function goto(page, url, opts={}) {
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 25000, ...opts });
    await sleep(2000);
    return true;
  } catch(e) {
    log('⚠️', `goto ${url}: ${e.message}`);
    await sleep(1000);
    return false;
  }
}

async function main() {
  log('🔍','DoctorShield Forensic Portal Audit v2 — READ ONLY');
  log('=', '===================================================');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox','--disable-setuid-sandbox','--window-size=1440,900'],
    defaultViewport: { width:1440, height:900 }
  });

  const page = await browser.newPage();

  // Network interception (READ ONLY — logging only)
  await page.setRequestInterception(false);
  page.on('response', async res => {
    const url = res.url();
    if (!url.includes('.png') && !url.includes('.jpg') && !url.includes('.woff') &&
        !url.includes('.css') && !url.includes('analytics') && !url.includes('gtm')) {
      audit.networkEvents.push({
        status: res.status(),
        url,
        contentType: res.headers()['content-type']||'',
        t: new Date().toISOString()
      });
    }
  });

  // ── SCREEN 01: Root Landing ───────────────────────────────────
  log('──','SCREEN 01: Root landing');
  await goto(page, BASE_URL);
  const s01 = await struct(page);
  await shot(page, 'landing-desktop', 'Landing page — desktop 1440px');
  audit.screens[audit.screens.length-1].data = s01;

  // Mobile view
  await page.setViewport({ width:375, height:812 });
  await sleep(800);
  await shot(page, 'landing-mobile', 'Landing page — mobile 375px');
  await page.setViewport({ width:1440, height:900 });
  await sleep(300);

  log('  ','Title: '+s01.title);
  log('  ','H1: '+JSON.stringify(s01.h1));
  log('  ','Buttons: '+s01.buttons?.map(b=>b.text).join(' | '));

  // Capture all internal links from landing
  audit.internalLinks = s01.links?.filter(l =>
    l.href.includes('doctorshield') || l.href.includes('thedoctorshield')) || [];
  log('  ',`Found ${audit.internalLinks.length} internal links`);

  // ── SCREEN 02: Click "Get a Quote" ───────────────────────────
  log('──','SCREEN 02: Click primary CTA');
  await goto(page, BASE_URL);
  let navigated = false;
  try {
    const [resp] = await Promise.all([
      page.waitForNavigation({ waitUntil:'networkidle2', timeout:15000 }).catch(()=>null),
      page.evaluate(() => {
        const el = [...document.querySelectorAll('button,a')]
          .find(e => /get a quote|buy now|buy|quote|apply|get started/i.test(e.innerText));
        if (el) { el.click(); return el.innerText.trim(); }
        return null;
      })
    ]);
    navigated = true;
    await sleep(2000);
  } catch(e) { log('⚠️',`CTA click: ${e.message}`); }

  const s02 = await struct(page);
  await shot(page, 'after-cta-click', 'After primary CTA click — first quote screen');
  audit.screens[audit.screens.length-1].data = s02;
  log('  ','URL after CTA: '+page.url());
  log('  ','H1: '+JSON.stringify(s02.h1));
  log('  ','Inputs: '+s02.inputs?.map(i=>i.label||i.placeholder||i.name).join(' | '));

  const quoteUrl = page.url();

  // ── SCREEN 03: Inspect quote form detail ─────────────────────
  log('──','SCREEN 03: Quote form full inspection');
  // Scroll down to reveal all content
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(1000);
  await shot(page, 'quote-form-scrolled', 'Quote form — scrolled to bottom');

  // ── SCREEN 04: Try selecting a practitioner type ──────────────
  log('──','SCREEN 04: Interact with practitioner type dropdown');
  const selectInteracted = await page.evaluate(() => {
    const selects = document.querySelectorAll('select');
    for(const sel of selects) {
      if(sel.options.length > 1) {
        // Just log options — don't change value for safety
        return [...sel.options].map(o=>({v:o.value,t:o.text}));
      }
    }
    // Try radio buttons
    const radios = document.querySelectorAll('input[type="radio"]');
    if(radios.length) return [...radios].map(r=>({name:r.name,value:r.value,label:r.closest('label')?.innerText||''}));
    return null;
  });
  log('  ','Options found: '+JSON.stringify(selectInteracted)?.substring(0,500));
  audit.findings.push({ type:'PRACTITIONER_OPTIONS', data: selectInteracted });

  // ── SCREEN 05–08: Check alternate paths ───────────────────────
  const paths = [
    { url: quoteUrl, name:'quote-form-main' },
    { url: BASE_URL + 'renew', name:'renewal-path' },
    { url: BASE_URL + 'renewal', name:'renewal-alt' },
    { url: 'https://quote.thedoctorshield.com/', name:'quote-subdomain' },
    { url: 'https://quote.thedoctorshield.com/renew', name:'renewal-subdomain' },
    { url: BASE_URL + 'login', name:'login-path' },
    { url: BASE_URL + 'personal-details', name:'personal-details' },
    { url: BASE_URL + 'declaration', name:'declaration-path' },
    { url: BASE_URL + 'summary', name:'summary-path' },
    { url: BASE_URL + 'payment', name:'payment-path' },
    { url: BASE_URL + 'confirmation', name:'confirmation-path' },
    { url: BASE_URL + 'success', name:'success-path' },
    { url: BASE_URL + 'error', name:'error-path' },
    { url: BASE_URL + 'referral', name:'referral-path' },
    { url: BASE_URL + 'contact', name:'contact-path' },
    { url: BASE_URL + 'faq', name:'faq-path' },
  ];

  log('──','SCREENS 05+: Exploring all known paths');
  for(const { url: u, name: n } of paths) {
    if(u === quoteUrl) continue;
    log('  ','→ '+u);
    const ok = await goto(page, u);
    if(ok) {
      const s = await struct(page);
      const finalUrl = page.url();
      // Only screenshot if we got somewhere meaningful (not redirected back to landing)
      if(s.h1?.length || s.inputs?.length || (finalUrl !== BASE_URL && finalUrl !== quoteUrl)) {
        await shot(page, `path-${n}`, `Path: ${u}`);
        audit.screens[audit.screens.length-1].data = { ...s, redirectedFrom: u };
        log('  ','  H1: '+JSON.stringify(s.h1));
      } else {
        log('  ','  → Redirected to landing (path blocked/invalid)');
        audit.findings.push({ type:'BLOCKED_PATH', url: u, redirectedTo: finalUrl });
      }
    }
  }

  // ── Visit all discovered internal links ───────────────────────
  log('──','Visiting internal links discovered on landing');
  const visited = new Set([BASE_URL, quoteUrl]);
  for(const link of audit.internalLinks.slice(0,25)) {
    if(visited.has(link.href)) continue;
    visited.add(link.href);
    log('  ','→ '+link.href);
    const ok = await goto(page, link.href);
    if(ok) {
      const s = await struct(page);
      await shot(page, `link-${link.text.substring(0,20).replace(/[^a-z0-9]/gi,'-').toLowerCase()}`, `Internal link: ${link.text}`);
      audit.screens[audit.screens.length-1].data = s;
    }
  }

  // ── Renewal portal ────────────────────────────────────────────
  log('──','RENEWAL: Testing renewal portal screens');
  await goto(page, 'https://quote.thedoctorshield.com/renew');
  const sRenew = await struct(page);
  await shot(page, 'renewal-quote-subdomain', 'Renewal portal — quote.thedoctorshield.com/renew');
  audit.screens[audit.screens.length-1].data = sRenew;
  log('  ','Renewal URL: '+page.url());
  log('  ','H1: '+JSON.stringify(sRenew.h1));
  log('  ','Inputs: '+sRenew.inputs?.map(i=>i.label||i.placeholder).join(' | '));

  // Mobile view of renewal
  await page.setViewport({ width:375, height:812 });
  await sleep(500);
  await shot(page, 'renewal-mobile', 'Renewal portal — mobile 375px');
  await page.setViewport({ width:1440, height:900 });

  // ── Back to quote flow — inspect form fields in depth ─────────
  log('──','DEEP FORM INSPECTION: returning to quote URL');
  await goto(page, quoteUrl);
  const sDeep = await struct(page);

  // Extract all visible text blocks for content audit
  const visibleContent = await page.evaluate(() => {
    const walk = (el, depth=0) => {
      if(!el || el.nodeType !== 1) return [];
      const tag = el.tagName.toLowerCase();
      if(['script','style','noscript','head'].includes(tag)) return [];
      const text = el.childNodes.length === 1 && el.childNodes[0].nodeType === 3
        ? el.childNodes[0].textContent.trim() : '';
      const result = text ? [{ tag, text, depth }] : [];
      return result.concat([...el.children].flatMap(c=>walk(c,depth+1)));
    };
    return walk(document.body).filter(n=>n.text.length>1).slice(0,200);
  });
  audit.findings.push({ type:'VISIBLE_CONTENT_TREE', data: visibleContent });

  // Scroll through entire quote form and screenshot each viewport
  await page.setViewport({ width:1440, height:900 });
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  log('  ',`Total page height: ${totalHeight}px`);

  for(let scrollY = 0; scrollY < Math.min(totalHeight, 6000); scrollY += 800) {
    await page.evaluate(y => window.scrollTo(0,y), scrollY);
    await sleep(400);
    if(scrollY === 0 || scrollY % 1600 === 0) {
      await shot(page, `quote-scroll-${scrollY}`, `Quote form — scroll position ${scrollY}px`);
    }
  }
  await page.evaluate(() => window.scrollTo(0,0));

  // ── Accessibility comprehensive check ─────────────────────────
  log('──','ACCESSIBILITY AUDIT');
  await goto(page, quoteUrl || BASE_URL);
  const a11y = await page.evaluate(() => {
    const issues = [];
    // 1. Missing img alt
    document.querySelectorAll('img').forEach(img => {
      if(!img.alt && !img.role === 'presentation') issues.push({ rule:'img-alt', el: img.outerHTML.substring(0,120) });
    });
    // 2. Inputs without labels
    document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]),select,textarea').forEach(inp => {
      const hasLabel = inp.id && document.querySelector(`label[for="${inp.id}"]`);
      const hasAria = inp.getAttribute('aria-label')||inp.getAttribute('aria-labelledby')||inp.getAttribute('title');
      if(!hasLabel && !hasAria) issues.push({ rule:'label-missing', el: inp.outerHTML.substring(0,120) });
    });
    // 3. Buttons without text
    document.querySelectorAll('button,[role="button"]').forEach(btn => {
      if(!btn.innerText.trim() && !btn.getAttribute('aria-label') && !btn.getAttribute('title')) {
        issues.push({ rule:'button-name', el: btn.outerHTML.substring(0,120) });
      }
    });
    // 4. Skip navigation
    const hasSkip = !!document.querySelector('a[href="#main"],a[href="#content"],a[href="#skip"]');
    if(!hasSkip) issues.push({ rule:'skip-link-missing', el:'(page level)' });
    // 5. HTML lang
    if(!document.documentElement.lang) issues.push({ rule:'html-lang-missing', el:'<html>' });
    // 6. Viewport meta
    const vp = document.querySelector('meta[name="viewport"]');
    if(!vp) issues.push({ rule:'meta-viewport-missing', el:'(page level)' });
    // 7. Focusable elements order
    const focusable = [...document.querySelectorAll('a,button,input,select,textarea,[tabindex]')];
    const badTabIndex = focusable.filter(el => parseInt(el.tabIndex) > 0);
    if(badTabIndex.length) issues.push({ rule:'positive-tabindex', count: badTabIndex.length, el:'(multiple)' });

    return {
      issues: issues.slice(0,100),
      summary: {
        totalImgs: document.querySelectorAll('img').length,
        imgsWithAlt: document.querySelectorAll('img[alt]').length,
        totalInputs: document.querySelectorAll('input,select,textarea').length,
        lang: document.documentElement.lang,
        hasSkipLink: hasSkip,
        metaViewport: vp?.content||'',
        totalFocusable: focusable.length,
        posTabIndex: badTabIndex.length,
        hasAriaLive: !!document.querySelector('[aria-live]'),
        hasAriaDescribedby: !!document.querySelector('[aria-describedby]')
      }
    };
  });
  audit.accessibility = a11y;
  log('  ',`A11y issues: ${a11y.issues.length} | Lang: ${a11y.summary.lang} | Skip link: ${a11y.summary.hasSkipLink}`);

  // ── Save outputs ──────────────────────────────────────────────
  const rawPath = path.join(NETWORK_DIR, '..', 'raw-audit.json');
  fs.writeFileSync(rawPath, JSON.stringify(audit, null, 2));

  const netPath = path.join(NETWORK_DIR, 'network-log.json');
  fs.writeFileSync(netPath, JSON.stringify(audit.networkEvents.slice(0,500), null, 2));

  log('✅',`Audit complete. Screens: ${audit.screens.length} | Screenshots: ${idx-1} | Network: ${audit.networkEvents.length}`);
  await browser.close();
}

main().catch(err => {
  console.error('FATAL:', err.message);
  process.exit(1);
});
