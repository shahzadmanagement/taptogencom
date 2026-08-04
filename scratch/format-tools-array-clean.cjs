const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Find start of `export const tools: Tool[] = [`
const headerEnd = content.indexOf('export const tools: Tool[] = [');
const header = content.substring(0, headerEnd + 'export const tools: Tool[] = ['.length);

const body = content.substring(headerEnd + 'export const tools: Tool[] = ['.length);

// Split tools by `slug:`
const toolBlocks = body.split(/\n\s*\{\s*\n?\s*slug:/);

console.log(`Found ${toolBlocks.length} tool blocks.`);

const cleanTools = [];

toolBlocks.forEach((block, idx) => {
  if (idx === 0) return; // Skip header remnant
  
  let toolStr = '{\n    slug:' + block;
  
  // Cut at `relatedSlugs: [...]` or `faqItems: [...]` + closing `}`
  const lastIndex = Math.max(toolStr.lastIndexOf('relatedSlugs:'), toolStr.lastIndexOf('faqItems:'));
  if (lastIndex !== -1) {
    const endBrace = toolStr.indexOf('}', lastIndex);
    if (endBrace !== -1) {
      toolStr = toolStr.substring(0, endBrace + 1);
    }
  }
  
  // Clean multi-line toolOptions remnants inside toolStr
  if (toolStr.includes('toolOptions:') && toolStr.includes('],')) {
    const optStart = toolStr.indexOf('toolOptions:');
    const optEnd = toolStr.indexOf('],', optStart);
    if (optEnd !== -1) {
      const toolOptClean = toolStr.substring(optStart, optEnd + 2);
      // Find where next property starts (e.g. outputFormat:, faqItems:, relatedSlugs:, disclaimer:, popular:)
      const nextPropMatch = toolStr.substring(optEnd + 2).match(/\n\s*(outputFormat|faqItems|relatedSlugs|disclaimer|popular):/);
      if (nextPropMatch) {
        const nextPropIdx = optEnd + 2 + nextPropMatch.index;
        toolStr = toolStr.substring(0, optEnd + 2) + toolStr.substring(nextPropIdx);
      }
    }
  }
  
  cleanTools.push(toolStr.trim());
});

const newContent = `${header}\n  ${cleanTools.join(',\n  ')}\n];\n`;

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully re-formatted tools array cleanly!');
