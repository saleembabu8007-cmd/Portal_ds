const fs = require('fs');
const pages = JSON.parse(fs.readFileSync('c:/Users/salee/Downloads/Portal_ds/docs/evidence/page-divs.json', 'utf8'));

console.log('=== PAGE / MODAL CONTAINERS ===');
pages.forEach((p, idx) => {
  const titles = p.texts.filter(t => t.tag.startsWith('H') || t.cls.includes('title')).map(t => t.text).join(' | ');
  const btnCount = p.buttons.length;
  const inpCount = p.inputs.length;
  console.log(`[${idx+1}] ID: "${p.id}" | class: "${p.className.substring(0, 30)}" | Titles: [${titles}] | Inputs: ${inpCount} | Buttons: ${btnCount}`);
});

