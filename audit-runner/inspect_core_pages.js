const fs = require('fs');
const pages = JSON.parse(fs.readFileSync('c:/Users/salee/Downloads/Portal_ds/docs/evidence/page-divs.json', 'utf8'));

function showPage(id) {
  const p = pages.find(x => x.id === id);
  if (!p) return console.log('Not found:', id);
  console.log(`=== ${id} ===`);
  console.log('Class:', p.className);
  console.log('Texts:');
  p.texts.forEach(t => console.log(`  [${t.tag}] ${t.text}`));
  console.log('Inputs:');
  p.inputs.forEach(i => console.log(`  [${i.type}] name="${i.name}" id="${i.id}" label="${i.label}" placeholder="${i.placeholder}"`));
  console.log('Buttons:');
  p.buttons.forEach(b => console.log(`  [btn] text="${b.text}" class="${b.cls}" id="${b.id}"`));
  console.log('\n');
}

['jsPage1', 'jsPage2', 'jsPage3', 'jsPage8', 'jsPage10', 'jsContact'].forEach(showPage);

