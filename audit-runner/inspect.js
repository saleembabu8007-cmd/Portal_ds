const fs = require('fs');
const audit = JSON.parse(fs.readFileSync('c:/Users/salee/Downloads/Portal_ds/docs/evidence/raw-audit.json', 'utf8'));

console.log('=== SCREENS IN AUDIT ===');
audit.screens.forEach((s, i) => {
  console.log(`${i+1}. [${s.screenshotId || 'N/A'}] ${s.file || ''} | ${s.desc || ''} | URL: ${s.url || ''}`);
});

console.log('\n=== SCREEN 1 INPUT DETAILS ===');
if (audit.screens[0] && audit.screens[0].data) {
  const d = audit.screens[0].data;
  console.log('Title:', d.title);
  console.log('H3s:', d.h3);
  console.log('Inputs count:', d.inputs?.length);
  
  // Group inputs by id or name
  console.log('\nInput fields:');
  d.inputs?.forEach(inp => {
    if (inp.id || inp.name || inp.label) {
      console.log(`- tag: ${inp.tag}, type: ${inp.type}, id: ${inp.id}, name: ${inp.name}, label: ${inp.label}, placeholder: ${inp.placeholder}, req: ${inp.required}, options: ${inp.options?.length || 0}`);
    }
  });
}

