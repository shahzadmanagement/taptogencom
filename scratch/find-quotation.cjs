const fs = require('fs');
const content = fs.readFileSync('src/scripts/tool-workspace.ts', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes("quotation-generator") || line.includes("purchase-order-generator") || line.includes("terms-generator")) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
