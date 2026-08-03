const fs = require('fs');
const content = fs.readFileSync('src/scripts/tool-workspace.ts', 'utf8');

content.split('\n').forEach((line, idx) => {
  if (line.includes("case 'chatgpt-prompt-generator':")) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
