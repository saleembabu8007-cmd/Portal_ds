const fs = require('fs');
const pages = JSON.parse(fs.readFileSync('c:/Users/salee/Downloads/Portal_ds/docs/evidence/page-divs.json', 'utf8'));

// Print detailed contents of each page
pages.forEach((p, idx) => {
  console.log(`\n================================================================`);
  console.log(`PAGE [${idx+1}] ID: ${p.id} | CLASS: ${p.className}`);
  console.log(`----------------------------------------------------------------`);
  console.log(`TEXTS & HEADINGS:`);
  p.texts.forEach(t => console.log(`  [${t.tag}] (${t.cls}): ${t.text}`));
  
  if (p.inputs.length > 0) {
    console.log(`INPUTS:`);
    p.inputs.forEach(i => console.log(`  - tag: ${i.tag}, type: ${i.type}, id: "${i.id}", name: "${i.name}", label: "${i.label}", placeholder: "${i.placeholder}"`));
  }
  
  if (p.buttons.length > 0) {
    console.log(`BUTTONS:`);
    p.buttons.forEach(b => console.log(`  - text: "${b.text}", id: "${b.id}", class: "${b.cls}"`));
  }
});

