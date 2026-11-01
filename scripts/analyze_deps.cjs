const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css') || file.endsWith('.json')) {
      results.push(path.resolve(file));
    }
  });
  return results;
}

const rootDir = path.resolve('.');
const allFiles = getFiles('./src');
const importMap = {};
allFiles.forEach(f => {
  importMap[f] = [];
});

allFiles.forEach(f => {
  if (!f.endsWith('.ts') && !f.endsWith('.tsx')) return;
  const content = fs.readFileSync(f, 'utf8');
  const dir = path.dirname(f);
  const regex = /from\s+['"](.*?)['"]|import\s+['"](.*?)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const importPath = match[1] || match[2];
    if (importPath && importPath.startsWith('.')) {
      let resolved = path.resolve(dir, importPath);
      let found = null;
      ['', '.ts', '.tsx', '.css', '.json', path.sep + 'index.ts', path.sep + 'index.tsx'].forEach(ext => {
        if (importMap[resolved + ext]) {
          found = resolved + ext;
        }
      });
      if (found) {
        importMap[found].push(f);
      }
    }
  }
});

console.log('=== FILES IN SRC WITH ZERO IMPORTERS (EXCLUDING ENTRY & TESTS) ===');
Object.keys(importMap).forEach(k => {
  const rel = path.relative(rootDir, k).replace(/\\/g, '/');
  if (importMap[k].length === 0) {
    if (!rel.includes('main.tsx') && !rel.includes('test/') && !rel.includes('App.tsx') && !rel.includes('index.ts') && !rel.includes('.gitkeep')) {
      console.log(rel);
    }
  }
});

console.log('\n=== COMPONENT DEPENDENCIES IN SRC/COMPONENTS ===');
Object.keys(importMap).filter(k => k.includes('components')).sort().forEach(k => {
  const rel = path.relative(rootDir, k).replace(/\\/g, '/');
  const importers = importMap[k].map(i => path.relative(rootDir, i).replace(/\\/g, '/'));
  console.log(`${rel} (${importers.length} importers):`);
  importers.forEach(imp => console.log(`   <- ${imp}`));
});
