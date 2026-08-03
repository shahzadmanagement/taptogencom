const fs = require('fs');
const content = fs.readFileSync('src/data/tools.ts', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes("slug: 'short-code-generator'") || line.includes("slug: 'pin-generator'") || line.includes("slug: 'recovery-code-generator'") || line.includes("slug: 'random-address-generator'")) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
