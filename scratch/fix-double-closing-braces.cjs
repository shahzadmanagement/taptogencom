const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/\}\},\s*\{\s*slug:/g, '  },\n  {\n    slug:');
content = content.replace(/\}\},\n\s*\{/g, '  },\n  {');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed double closing braces in tools.ts');
