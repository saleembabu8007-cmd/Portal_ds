const fs = require('fs');
const homeJs = fs.readFileSync('c:/Users/salee/Downloads/Portal_ds/docs/evidence/scripts/home.min.js', 'utf8');

// Search for jsPage11, jsPage8, jsPage10
['jsPage8', 'jsPage10', 'jsPage11', 'jsPage12', 'jsPage13', 'have_claim_ever_been_made'].forEach(id => {
  const idx = homeJs.indexOf(id);
  console.log(`=== Matches for ${id} ===`);
  let pos = 0;
  while ((pos = homeJs.indexOf(id, pos)) !== -1) {
    console.log(homeJs.substring(Math.max(0, pos - 100), Math.min(homeJs.length, pos + 250)));
    console.log('---');
    pos += id.length + 50;
    if (pos >= homeJs.length) break;
  }
});

