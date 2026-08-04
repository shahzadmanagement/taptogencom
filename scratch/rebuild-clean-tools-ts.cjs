const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');

// Keep everything before `export const tools: Tool[] = [`
const headerLines = [];
let i = 0;
while (i < lines.length && !lines[i].includes('export const tools: Tool[] = [')) {
  headerLines.push(lines[i]);
  i++;
}
headerLines.push('export const tools: Tool[] = [');
i++; // skip `export const tools: Tool[] = [`

// Process tool objects
const toolBlocks = [];
let currentBlock = [];

while (i < lines.length) {
  const line = lines[i];
  if (line.trim().startsWith('slug:')) {
    if (currentBlock.length > 0) {
      toolBlocks.push(currentBlock);
      currentBlock = [];
    }
  }
  if (line.trim() === '];') {
    if (currentBlock.length > 0) {
      toolBlocks.push(currentBlock);
      currentBlock = [];
    }
    break;
  }
  currentBlock.push(line);
  i++;
}

console.log(`Extracted ${toolBlocks.length} tool blocks.`);

const cleanToolStrings = toolBlocks.map(blockLines => {
  // Filter out any stray standalone `{`, `}`, `},` lines
  const filtered = blockLines.filter(l => {
    const t = l.trim();
    if (t === '{' || t === '}' || t === '},' || t === '];') return false;
    return true;
  });
  return '  {\n' + filtered.map(l => '  ' + l).join('\n') + '\n  }';
});

const finalContent = headerLines.join('\n') + '\n' + cleanToolStrings.join(',\n') + '\n];\n';

fs.writeFileSync(filePath, finalContent, 'utf8');
console.log('Successfully rebuilt tools.ts with 100% perfect object boundaries!');
