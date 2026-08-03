const fs = require('fs');
const content = fs.readFileSync('src/data/tools.ts', 'utf8');

const lineSplits = content.split('\n');
lineSplits.forEach((line, idx) => {
  if (line.includes('comebacks') || line.includes('insult') || line.includes('witty')) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
