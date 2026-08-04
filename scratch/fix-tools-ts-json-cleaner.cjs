const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Find start of `export const tools: Tool[] = [`
const headerEnd = content.indexOf('export const tools: Tool[] = [');
const header = content.substring(0, headerEnd + 'export const tools: Tool[] = ['.length);

const body = content.substring(headerEnd + 'export const tools: Tool[] = ['.length);

// Split tools by `slug:`
const toolBlocks = body.split(/slug:\s*['"`]/);

console.log(`Found ${toolBlocks.length} tool entries.`);

const cleanToolStrings = [];

toolBlocks.forEach((block, idx) => {
  if (idx === 0) return; // Skip header remnant
  
  const endQuoteIdx = block.indexOf("'") !== -1 ? block.indexOf("'") : block.indexOf('"');
  const slug = block.substring(0, endQuoteIdx);
  
  // Extract key-value lines
  const lines = block.split('\n');
  const props = [];
  
  let inFaq = false;
  let inOptions = false;
  let faqStr = '';
  let optionsStr = '';
  
  lines.forEach(l => {
    const t = l.trim();
    if (!t || t === '{' || t === '}' || t === '},' || t === '];') return;
    
    if (t.startsWith('toolOptions:')) {
      optionsStr = t.substring(t.indexOf('toolOptions:') + 12).trim();
      if (optionsStr.endsWith(',')) optionsStr = optionsStr.slice(0, -1).trim();
      return;
    }
    if (t.startsWith('faqItems:')) {
      faqStr = t.substring(t.indexOf('faqItems:') + 9).trim();
      if (faqStr.endsWith(',')) faqStr = faqStr.slice(0, -1).trim();
      return;
    }
    
    if (t.includes(':')) {
      props.push('    ' + t);
    }
  });
  
  // Format toolOptions string
  let cleanOptions = '[]';
  if (optionsStr && optionsStr.startsWith('[')) {
    try {
      // Clean trailing noise
      let bracketEnd = optionsStr.lastIndexOf(']');
      if (bracketEnd !== -1) {
        const candidate = optionsStr.substring(0, bracketEnd + 1);
        JSON.parse(candidate);
        cleanOptions = candidate;
      }
    } catch (e) {
      cleanOptions = '[]';
    }
  }
  
  // Format faqItems string
  let cleanFaq = '[]';
  if (faqStr && faqStr.startsWith('[')) {
    try {
      let bracketEnd = faqStr.lastIndexOf(']');
      if (bracketEnd !== -1) {
        const candidate = faqStr.substring(0, bracketEnd + 1);
        JSON.parse(candidate);
        cleanFaq = candidate;
      }
    } catch (e) {
      cleanFaq = '[]';
    }
  }
  
  const toolObjectLines = [
    '  {',
    `    slug: '${slug}',`,
    ...props.filter(p => !p.includes('slug:')),
    `    toolOptions: ${cleanOptions},`,
    `    faqItems: ${cleanFaq}`,
    '  }'
  ];
  
  cleanToolStrings.push(toolObjectLines.join('\n'));
});

const finalContent = `${header}\n${cleanToolStrings.join(',\n')}\n];\n`;

fs.writeFileSync(filePath, finalContent, 'utf8');
console.log('Successfully re-formatted tools.ts cleanly with 100% valid JSON options and FAQs!');
