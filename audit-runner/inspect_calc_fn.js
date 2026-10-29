const fs = require('fs');
const homeJs = fs.readFileSync('c:/Users/salee/Downloads/Portal_ds/docs/evidence/scripts/home.min.js', 'utf8');

// Find calculatePremium
const idx = homeJs.indexOf('calculatePremium:function');
if (idx !== -1) {
  console.log('=== calculatePremium function snippet ===');
  console.log(homeJs.substring(idx, idx + 2500));
}

// Find Page 3 submit / referral logic
const idx3 = homeJs.indexOf('jsPage3Submit');
if (idx3 !== -1) {
  console.log('\n=== jsPage3Submit snippet ===');
  console.log(homeJs.substring(idx3 - 200, idx3 + 2000));
}

