const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/(\{"value":[^}]+\})\]\],/g, '$1}]],');
content = content.replace(/("label":[^}]+\})\]\],/g, '$1}]],');

// Replace any toolOptions ending in `}]],` where option object wasn't closed
content = content.replace(/("label":"[^"]+"\}\]\],)/g, (match) => match.replace('}]],', '}]}],'));

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed option object brackets in tools.ts');
