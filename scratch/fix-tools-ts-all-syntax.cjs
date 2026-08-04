const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Fix trailing syntax errors
content = content.replace(/,},/g, '\n  },');
content = content.replace(/,"id":[^\]]+\]\],/g, '],');
content = content.replace(/,"id":[^\]]+\]/g, ']');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed all syntax errors in tools.ts');
