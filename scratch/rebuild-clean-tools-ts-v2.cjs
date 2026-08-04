const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');

// Find start of `export const tools: Tool[] = [`
const headerLines = [];
let i = 0;
while (i < lines.length && !lines[i].includes('export const tools: Tool[] = [')) {
  headerLines.push(lines[i]);
  i++;
}
headerLines.push('export const tools: Tool[] = [');
i++;

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

const cleanToolStrings = toolBlocks.map(blockLines => {
  // Fix multi-line options or single-line option array formatting inside blockLines
  const newBlockLines = [];
  let inArray = false;
  
  for (let k = 0; k < blockLines.length; k++) {
    const l = blockLines[k];
    const t = l.trim();
    
    // Skip standalone tool-wrapper braces at depth 0
    if ((t === '{' || t === '}' || t === '},') && !inArray) {
      continue;
    }
    
    if (t.startsWith('toolOptions:') || t.startsWith('faqItems:') || t.startsWith('options:')) {
      inArray = true;
    }
    if (t === '],' || t === ']') {
      inArray = false;
    }
    
    newBlockLines.push(l);
  }
  
  return '  {\n' + newBlockLines.join('\n') + '\n  }';
});

const finalContent = headerLines.join('\n') + '\n' + cleanToolStrings.join(',\n') + '\n];\n';

fs.writeFileSync(filePath, finalContent, 'utf8');
console.log('Successfully rebuilt tools.ts v2!');
