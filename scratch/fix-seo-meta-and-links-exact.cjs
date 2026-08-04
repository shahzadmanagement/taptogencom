const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');
const { tools } = loadTS(filePath);

let fixCount = 0;

tools.forEach(t => {
  const desc = (t.metaDescription || '').trim();
  if (desc.length > 158) {
    let trimmed = desc.slice(0, 150);
    const lastSpace = trimmed.lastIndexOf(' ');
    if (lastSpace > 100) {
      trimmed = trimmed.slice(0, lastSpace) + '.';
    } else {
      trimmed = trimmed + '.';
    }

    // Match exact string in file
    const escapedDesc = desc.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`metaDescription:\\s*(['"\`])${escapedDesc}\\1`, 'g');
    
    if (regex.test(content)) {
      content = content.replace(regex, `metaDescription: ${JSON.stringify(trimmed)}`);
      fixCount++;
    } else {
      console.log(`Could not match metaDescription for ${t.slug}`);
    }
  }
});

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Successfully trimmed ${fixCount} long meta descriptions.`);
