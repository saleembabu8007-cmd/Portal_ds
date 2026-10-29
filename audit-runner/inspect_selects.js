const fs = require('fs');

const audit = JSON.parse(fs.readFileSync('c:/Users/salee/Downloads/Portal_ds/docs/evidence/raw-audit.json', 'utf8'));
const d = audit.screens[0].data;

['liability_id', 'clinic_liability_id', 'country_id', 'income', 'nationality'].forEach(fieldName => {
  const inp = d.inputs.find(i => i.name === fieldName || i.id === fieldName);
  if (inp) {
    console.log(`=== OPTIONS FOR ${fieldName} ===`);
    console.log(JSON.stringify(inp.options, null, 2));
  } else {
    console.log(`Field ${fieldName} not found`);
  }
});

