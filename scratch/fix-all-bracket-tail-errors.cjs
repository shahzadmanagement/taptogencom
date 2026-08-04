const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace any excessive brackets at the end of toolOptions arrays
content = content.replace(/\]\]\]\]/g, ']]');
content = content.replace(/\]\]\]/g, ']]');
content = content.replace(/\}]\],/g, '}],');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed all bracket tail errors in tools.ts');
