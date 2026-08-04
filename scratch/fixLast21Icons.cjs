/**
 * Final cleanup — fix the last 21 remaining ⚡ icons via direct string replacement
 */
const fs = require('fs');
const path = require('path');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(toolsPath, 'utf8');

const fixes = {
  'product-title-generator': '🛍️',
  'citation-generator': '📚',
  'wordart-generator': '🎨',
  'gamertag-generator': '🎮',
  'synonym-generator': '📖',
  'footnote-generator': '📝',
  'all-caps-generator': 'AA',
  'lowercase-generator': 'aa',
  'corporate-speak-generator': '💼',
  'dialogue-tag-generator': '💬',
  'name-tag-generator': '🪪',
  'tag-cloud-generator': '#️⃣',
  'random-height-generator': '📏',
  'flexbox-generator': '📐',
  'cake-company-names-generator': '🎂',
  'pet-tag-generator': '🐾',
  'dj-tag-generator': '🎧',
  'clan-tag-generator': '⚔️',
  'hang-tag-generator': '🏷️',
  'art-tag-generator': '🎨',
  'performer-names-generator': '🎭',
};

let fixed = 0;
for (const [slug, icon] of Object.entries(fixes)) {
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`("slug":\\s*"${escapedSlug}"[\\s\\S]*?"icon":\\s*)"[^"]*"`, '');
  if (pattern.test(content)) {
    content = content.replace(pattern, `$1"${icon}"`);
    fixed++;
  }
}

fs.writeFileSync(toolsPath, content, 'utf8');
console.log(`✅ Final 21 icons fixed: ${fixed}`);

// Quick verify
const remaining = (content.match(/"icon": "⚡"/g) || []).length;
console.log(`   Remaining ⚡ icons in file: ${remaining}`);
