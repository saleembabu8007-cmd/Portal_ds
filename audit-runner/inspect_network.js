const fs = require('fs');

const audit = JSON.parse(fs.readFileSync('c:/Users/salee/Downloads/Portal_ds/docs/evidence/raw-audit.json', 'utf8'));
const net = JSON.parse(fs.readFileSync('c:/Users/salee/Downloads/Portal_ds/docs/evidence/network/network-log.json', 'utf8'));

console.log('=== NETWORK ENDPOINTS ===');
const urls = new Set();
net.forEach(e => {
  try {
    const u = new URL(e.url);
    urls.add(`${e.method || 'GET'} ${u.origin}${u.pathname}`);
  } catch(err) {
    urls.add(e.url);
  }
});
urls.forEach(u => console.log(u));

console.log('\n=== CSS VARIABLES & FONTS ===');
if (audit.screens[0] && audit.screens[0].data) {
  console.log('Fonts:', audit.screens[0].data.fonts);
  console.log('CSS Vars:', audit.screens[0].data.cssVars);
}

console.log('\n=== ALL INPUTS WITH LABELS AND IDS ===');
const d = audit.screens[0].data;
if (d && d.inputs) {
  d.inputs.forEach((inp, idx) => {
    console.log(`[${idx+1}] tag: ${inp.tag} | type: ${inp.type} | id: ${inp.id} | name: ${inp.name} | label: ${inp.label} | placeholder: ${inp.placeholder}`);
    if (inp.options && inp.options.length > 0) {
      console.log(`    options: ${JSON.stringify(inp.options.slice(0, 10))}`);
    }
  });
}

