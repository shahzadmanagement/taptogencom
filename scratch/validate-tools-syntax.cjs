const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
const code = fs.readFileSync(filePath, 'utf8');

try {
  esbuild.transformSync(code, { loader: 'ts' });
  console.log('VALID TS SYNTAX!');
} catch (err) {
  console.error('SYNTAX ERROR:', err.errors);
}
