const fs = require('fs');
const path = require('path');

const homeJs = fs.readFileSync('c:/Users/salee/Downloads/Portal_ds/docs/evidence/scripts/home.min.js', 'utf8');
const commonJs = fs.readFileSync('c:/Users/salee/Downloads/Portal_ds/docs/evidence/scripts/common-frontend.min.js', 'utf8');

console.log('=== SEARCHING AJAX ENDPOINTS ===');
const ajaxMatches = [...homeJs.matchAll(/url\s*:\s*["']([^"']+)["']/g), ...commonJs.matchAll(/url\s*:\s*["']([^"']+)["']/g)];
const ajaxUrls = new Set(ajaxMatches.map(m => m[1]));
ajaxUrls.forEach(u => console.log('AJAX URL:', u));

console.log('\n=== SEARCHING TAX / SST / STAMP DUTY ===');
const taxMatches = homeJs.match(/(\b(sst|stamp|tax|duty|8%|6%|10)\b[^\n;]{1,100})/gi) || [];
taxMatches.slice(0, 15).forEach(m => console.log('TAX:', m));

console.log('\n=== SEARCHING CALCULATION LOGIC ===');
// Search for functions related to calculate, prorated, days, diff
const calcSnippets = homeJs.match(/(function[^{]*calc[^{]*\{[^}]{1,300}\})/gi) || [];
calcSnippets.slice(0, 10).forEach(s => console.log('CALC:', s));

console.log('\n=== SEARCHING BACKDATE / CLAUSE 6.12 ===');
const backdateSnippets = homeJs.match(/([^\n;]{0,50}(backdate|6\.12|retroactive)[^\n;]{0,100})/gi) || [];
backdateSnippets.slice(0, 10).forEach(s => console.log('BACKDATE:', s));

console.log('\n=== SEARCHING PROMO CODE LOGIC ===');
const promoSnippets = homeJs.match(/([^\n;]{0,50}promo[^\n;]{0,100})/gi) || [];
promoSnippets.slice(0, 10).forEach(s => console.log('PROMO:', s));

console.log('\n=== SEARCHING REFERRAL / PAGE8 / UNDERWRITING DECISIONS ===');
const refSnippets = homeJs.match(/([^\n;]{0,50}(jsPage8|jsContact|referral)[^\n;]{0,100})/gi) || [];
refSnippets.slice(0, 10).forEach(s => console.log('REF:', s));

