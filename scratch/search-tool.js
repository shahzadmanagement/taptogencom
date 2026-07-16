import fs from 'fs';
import path from 'path';

const query = process.argv[2];
const filePath = process.argv[3] || 'src/data/tools.ts';

if (!query) {
  console.error('Please specify a search query');
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');
let count = 0;

console.log(`Searching for "${query}" in ${filePath}...`);
lines.forEach((line, index) => {
  if (line.toLowerCase().includes(query.toLowerCase())) {
    console.log(`${index + 1}: ${line.trim()}`);
    count++;
  }
});
console.log(`Found ${count} matches.`);
