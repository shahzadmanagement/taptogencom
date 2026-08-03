const fs = require('fs');
const content = fs.readFileSync('src/scripts/tool-workspace.ts', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes("case 'pin-generator':") || line.includes("case 'recovery-code-generator':") || line.includes("case 'random-address-generator':") || line.includes("case 'short-code-generator':")) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
