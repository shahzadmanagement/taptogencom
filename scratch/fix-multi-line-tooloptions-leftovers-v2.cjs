const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
const newLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  newLines.push(line);
  
  if (line.includes('toolOptions:') && line.includes('],')) {
    // Skip subsequent lines until outputFormat, faqItems, disclaimer, relatedSlugs, popular, slug, name, icon, tagline, description, category
    let j = i + 1;
    while (j < lines.length) {
      const nextLine = lines[j].trim();
      const keys = ['outputFormat:', 'faqItems:', 'disclaimer:', 'relatedSlugs:', 'popular:', 'slug:', 'name:', 'icon:', 'tagline:', 'description:', 'category:', 'categorySlug:', 'primaryKeyword:', 'secondaryKeywords:', 'metaTitle:', 'metaDescription:', 'userIntent:', 'generatorType:'];
      if (keys.some(k => nextLine.startsWith(k)) || nextLine.startsWith('}') || nextLine.startsWith('{')) {
        break;
      }
      j++;
    }
    i = j - 1;
  }
}

fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
console.log('Fixed all multi-line toolOptions leftovers v2 in tools.ts');
