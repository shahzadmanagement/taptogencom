const fs = require('fs');
const content = fs.readFileSync('src/data/tools.ts', 'utf8');

const searchTerms = ['jwt', 'pin', 'recovery', 'security', 'headers'];
content.split('\n').forEach((line, idx) => {
  searchTerms.forEach(term => {
    if (line.includes(`slug:`) && line.toLowerCase().includes(term)) {
      console.log(`Line ${idx + 1}: ${line}`);
    }
  });
});
