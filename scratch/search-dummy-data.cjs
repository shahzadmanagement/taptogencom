const fs = require('fs');
const content = fs.readFileSync('src/scripts/tool-workspace.ts', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('dummy-data-generator')) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
