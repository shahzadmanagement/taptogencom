const fs = require('fs');
const content = fs.readFileSync('src/scripts/tool-workspace.ts', 'utf8');

content.split('\n').forEach((line, idx) => {
  if (line.includes('btn-download') || line.includes('downloadFile') || line.includes('export')) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
