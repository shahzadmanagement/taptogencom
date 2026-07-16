import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const fileContent = fs.readFileSync(path.join(repoRoot, 'src/scripts/tool-workspace.ts'), 'utf8');
const lines = fileContent.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('copyText')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
