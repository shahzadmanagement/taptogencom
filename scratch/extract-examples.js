import fs from 'fs';
import path from 'path';

const workspacePath = path.join(process.cwd(), 'src/scripts/tool-workspace.ts');
const datasetsPath = path.join(process.cwd(), 'src/scripts/data/generator-datasets.ts');

const content = fs.readFileSync(workspacePath, 'utf-8');
const lines = content.split('\n');

// Find the line index where 'const examples: Record<string, string> = {' starts
const examplesStartIndex = lines.findIndex(line => line.includes('const examples: Record<string, string> = {'));
// Find the line index where it ends, which is right before '// Unicode font maps' or similar
const examplesEndIndex = lines.findIndex(line => line.includes('// Unicode font maps'));

console.log('Examples start:', examplesStartIndex);
console.log('Examples end:', examplesEndIndex);

if (examplesStartIndex === -1 || examplesEndIndex === -1) {
  console.error('Failed to locate examples boundaries.');
  process.exit(1);
}

const examplesLines = lines.slice(examplesStartIndex, examplesEndIndex);
const remainingLinesBefore = lines.slice(0, examplesStartIndex);
const remainingLinesAfter = lines.slice(examplesEndIndex);

// Add 'export ' to const examples definition
const examplesContent = examplesLines.map(line => {
  if (line.trim().startsWith('const examples')) {
    return line.replace('const examples', 'export const examples');
  }
  return line;
}).join('\n');

// Append to generator-datasets.ts
let datasetsContent = fs.readFileSync(datasetsPath, 'utf-8');
datasetsContent += '\n\n' + examplesContent;
fs.writeFileSync(datasetsPath, datasetsContent, 'utf-8');
console.log('Appended examples mapping to datasets module.');

// Now write back tool-workspace.ts with examples removed
// We will replace exampleBtn and example-chip listeners at the end of the file
const newWorkspaceContent = remainingLinesBefore.concat(remainingLinesAfter).join('\n');
fs.writeFileSync(workspacePath, newWorkspaceContent, 'utf-8');
console.log('Removed examples from tool-workspace.ts successfully!');
