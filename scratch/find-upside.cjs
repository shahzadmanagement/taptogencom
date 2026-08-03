const fs = require('fs');
const content = fs.readFileSync('src/data/tools.ts', 'utf8');

content.split('\n').forEach((line, idx) => {
  if (line.toLowerCase().includes('upside') || line.toLowerCase().includes('flip')) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
