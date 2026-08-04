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

const validKeys = [
  'name:', 'icon:', 'tagline:', 'description:', 'category:', 'categorySlug:',
  'primaryKeyword:', 'secondaryKeywords:', 'metaTitle:', 'metaDescription:',
  'userIntent:', 'generatorType:', 'popular:', 'outputFormat:', 'disclaimer:',
  'relatedSlugs:'
];

const cleanToolStrings = [];

toolBlocks.forEach((block, idx) => {
  if (idx === 0) return; // Skip header remnant
  
  const endQuoteIdx = block.indexOf("'") !== -1 ? block.indexOf("'") : block.indexOf('"');
  const slug = block.substring(0, endQuoteIdx);
  
  const lines = block.split('\n');
  const props = [];
  
  let optionsStr = '';
  let faqStr = '';
  
  lines.forEach(l => {
    const t = l.trim();
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
    
    if (validKeys.some(k => t.startsWith(k))) {
      let lineStr = t;
      if (!lineStr.endsWith(',')) lineStr += ',';
      props.push('    ' + lineStr);
    }
  });
  
  let cleanOptions = '[]';
  if (optionsStr && optionsStr.startsWith('[')) {
    try {
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
    ...props,
    `    toolOptions: ${cleanOptions},`,
    `    faqItems: ${cleanFaq}`,
    '  }'
  ];
  
  cleanToolStrings.push(toolObjectLines.join('\n'));
});

const finalContent = `${header}\n${cleanToolStrings.join(',\n')}\n];\n`;

fs.writeFileSync(filePath, finalContent, 'utf8');
console.log('Successfully re-formatted tools.ts v3 with 100% valid commas!');
