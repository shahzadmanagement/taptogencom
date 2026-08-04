const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace `relatedSlugs: [...]}` with `relatedSlugs: [...]`
content = content.replace(/(relatedSlugs:\s*\[[\s\S]*?\])\},/g, '$1');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Stripped trailing braces from relatedSlugs in tools.ts');
