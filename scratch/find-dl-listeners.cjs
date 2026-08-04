const fs = require('fs');
const content = fs.readFileSync('src/scripts/tool-workspace.ts', 'utf8');

content.split('\n').forEach((line, idx) => {
  if (line.toLowerCase().includes('download') && line.includes('addEventListener')) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
