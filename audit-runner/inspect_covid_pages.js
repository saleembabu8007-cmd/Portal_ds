const fs = require('fs');
const pages = JSON.parse(fs.readFileSync('c:/Users/salee/Downloads/Portal_ds/docs/evidence/page-divs.json', 'utf8'));

['jsPage11RegulatoryAndVirusQuestions', 'jsPage12BusinessContiunityQuestions', 'jsPage13EmployeeAndCommunicationQuestions'].forEach(id => {
  const p = pages.find(x => x.id === id);
  if (!p) return;
  console.log(`=== ${id} ===`);
  p.texts.forEach(t => console.log(`  [${t.tag}] ${t.text}`));
  p.inputs.forEach(i => console.log(`  [${i.type}] ${i.name} (${i.id})`));
  p.buttons.forEach(b => console.log(`  [btn] ${b.text}`));
  console.log('\n');
});

