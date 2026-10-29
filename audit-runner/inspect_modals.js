const fs = require('fs');
const pages = JSON.parse(fs.readFileSync('c:/Users/salee/Downloads/Portal_ds/docs/evidence/page-divs.json', 'utf8'));

const modals = pages.filter(p => p.className.includes('modal') || p.id.toLowerCase().includes('modal') || p.id.toLowerCase().includes('model'));

console.log(`Found ${modals.length} modals:`);
modals.forEach((m, i) => {
  console.log(`\n------------------------------------------------------------`);
  console.log(`MODAL [${i+1}] ID: ${m.id} | CLASS: ${m.className}`);
  console.log(`TEXTS:`);
  m.texts.forEach(t => console.log(`  [${t.tag}] ${t.text}`));
  if (m.inputs.length > 0) {
    console.log(`INPUTS:`);
    m.inputs.forEach(inp => console.log(`  - tag: ${inp.tag}, type: ${inp.type}, id: ${inp.id}, label: ${inp.label}, placeholder: ${inp.placeholder}`));
  }
  if (m.buttons.length > 0) {
    console.log(`BUTTONS:`);
    m.buttons.forEach(b => console.log(`  - text: "${b.text}", class: "${b.cls}"`));
  }
});

