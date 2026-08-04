const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/\}]\],/g, '}],');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed double closing brackets in tools.ts');
