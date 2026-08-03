const fs = require('fs');
const content = fs.readFileSync('src/data/tools.ts', 'utf8');

content.split('\n').forEach((line, idx) => {
  if (line.includes('slug:') && (line.toLowerCase().includes('header') || line.toLowerCase().includes('secur'))) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
