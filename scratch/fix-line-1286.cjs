const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace duplicate options tail
content = content.replace(/\}],"options":\[[\s\S]*?\}]/g, '}]');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed line 1286 in tools.ts');
