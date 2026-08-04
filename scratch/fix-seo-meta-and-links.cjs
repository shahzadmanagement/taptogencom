const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsFilePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(toolsFilePath, 'utf8');
const { tools } = loadTS(toolsFilePath);

let metaFixed = 0;
let linksFixed = 0;

tools.forEach(t => {
  // 1. Truncate long meta descriptions cleanly
  const desc = (t.metaDescription || '').trim();
  if (desc.length > 158) {
    // Trim sentence or at last word boundary before 155 chars
    let trimmed = desc.slice(0, 155);
    const lastSpace = trimmed.lastIndexOf(' ');
    if (lastSpace > 120) {
      trimmed = trimmed.slice(0, lastSpace) + '.';
    } else {
      trimmed = trimmed + '.';
    }
    
    // Replace in file
    const slugRegex = new RegExp(`(slug:\\s*'${t.slug}'[\\s\\S]*?metaDescription:\\s*')[^']+'`, 'm');
    const match = content.match(slugRegex);
    if (match) {
      content = content.replace(match[0], `${match[1]}${trimmed.replace(/'/g, "\\'")}'`);
      metaFixed++;
    }
  }

  // 2. Ensure relatedSlugs >= 4
  const related = t.relatedSlugs || [];
  if (related.length < 3) {
    // Find tools in the same category
    const sameCatTools = tools.filter(other => other.categorySlug === t.categorySlug && other.slug !== t.slug).map(o => o.slug);
    const fallbackSlugs = ['name-generator', 'username-generator', 'password-generator', 'lorem-ipsum-generator'];
    
    const combined = Array.from(new Set([...related, ...sameCatTools, ...fallbackSlugs])).slice(0, 4);
    
    const slugRegex = new RegExp(`(slug:\\s*'${t.slug}'[\\s\\S]*?relatedSlugs:\\s*\\[)([^\\]]*)(\\])`, 'm');
    const match = content.match(slugRegex);
    if (match) {
      const formatted = combined.map(s => `"${s}"`).join(',');
      content = content.replace(match[0], `${match[1]}${formatted}${match[3]}`);
      linksFixed++;
    }
  }
});

fs.writeFileSync(toolsFilePath, content, 'utf8');
console.log(`Successfully fixed ${metaFixed} meta descriptions and ${linksFixed} related link arrays.`);
