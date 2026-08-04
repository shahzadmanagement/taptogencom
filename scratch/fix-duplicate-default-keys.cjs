const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace duplicate default keys on same line: `default: "foo", default: "bar"` -> `default: "foo"`
content = content.replace(/(default:\s*['"][^'"]+['"]\s*),\s*default:\s*['"][^'"]+['"]/g, '$1');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed duplicate default keys in tools.ts');
