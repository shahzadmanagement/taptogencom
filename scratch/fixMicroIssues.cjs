/**
 * Fix last 3 micro-issues:
 * 1. roast-generator desc too long (trim to 160)
 * 2. jwt-generator desc too long (trim to 160)
 * 3. scifi-name-generator title needs "Sci-Fi" to match "sci fi name generator" keyword
 */
const fs = require('fs');
const path = require('path');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(toolsPath, 'utf8');

const fixes = [
  {
    slug: 'roast-generator',
    field: 'metaDescription',
    value: 'Free Roast Generator — create playful, opt-in roast lines with off-limits reminders and safe alternatives. Customize tone and review before sharing. 100% free.'
  },
  {
    slug: 'jwt-generator',
    field: 'metaDescription',
    value: 'Free JWT Generator — create and decode JSON Web Token samples with configurable headers, payloads, and algorithm options. 100% client-side, no data stored.'
  },
  {
    slug: 'scifi-name-generator',
    field: 'metaTitle',
    value: 'Sci-Fi Name Generator — Futuristic Sci Fi Character Names'
  }
];

let fixed = 0;
for (const fix of fixes) {
  const escapedSlug = fix.slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const fieldKey = fix.field === 'metaTitle' ? 'metaTitle' : 'metaDescription';
  const pattern = new RegExp(`("slug":\\s*"${escapedSlug}"[\\s\\S]{0,2000}?"${fieldKey}":\\s*)"[^"]*"`, '');
  if (pattern.test(content)) {
    content = content.replace(pattern, `$1"${fix.value.replace(/"/g, '\\"')}"`);
    fixed++;
    console.log(`✅ Fixed ${fix.slug} ${fix.field}`);
  } else {
    console.log(`⚠️  Could not find ${fix.slug} ${fix.field}`);
  }
}

fs.writeFileSync(toolsPath, content, 'utf8');
console.log(`\nTotal fixed: ${fixed}/3`);
