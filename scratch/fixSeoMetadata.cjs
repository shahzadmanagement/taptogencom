/**
 * Fix remaining 33 SEO issues:
 * - 24 KW_NOT_IN_TITLE: fix meta titles to include primary keyword
 * - 9 DESC_TOO_SHORT: expand meta descriptions to 100+ chars
 */
const fs = require('fs');
const path = require('path');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(toolsPath, 'utf8');

// =============================================
// KW_NOT_IN_TITLE FIXES
// =============================================
const titleFixes = {
  'giveaway-generator': 'Giveaway Winner Generator — Random & Fair Picker',
  'jwt-generator': 'JWT Generator — Encode & Decode JSON Web Tokens',
  'follow-up-email-generator': 'Follow Up Email Generator — Professional Drafts',
  'dnd-character-generator': 'DnD Character Generator — D&D Character Builder',
  'japanese-name-generator': 'Japanese Name Generator — Authentic Name Ideas',
  'korean-name-generator': 'Korean Name Generator — Authentic Korean Names',
  'geo-tag-generator': 'Geo Tag Generator — Location Tags & Coordinates',
  'secret-santa-name-generator': 'Secret Santa Name Generator — Gift Exchange Picker',
  'anagram-of-name-generator': 'Name Anagram Generator — Scramble Any Name',
  'scifi-name-generator': 'Sci-Fi Name Generator — Futuristic Character Names',
  'nickname-generator-based-on-name': 'Nickname Generator From Name — Custom Nicknames',
  'phonetic-spelling-of-name-generator': 'Phonetic Spelling Generator — IPA Pronunciation',
  'disc-jockey-names-generator': 'DJ Name Generator — Stage Names for DJs',
  'color-palette-generator-from-name': 'Color Palette From Name Generator — Hex Codes',
  'team-name-generator-using-keywords': 'Team Name Generator With Keyword — Custom Teams',
  'trademark-friendly-name-generator': 'Trademark Friendly Name Generator — Safe Brand Names',
  'dj-name-generator': 'DJ Stage Name Generator — Cool DJ Name Ideas',
  'fake-text-generator': 'Fake Text Generator — Placeholder & Dummy Text',
  'ancient-greek-inspired-name-generator': 'Ancient Greek Inspired Name Generator — Mythology',
  'roman-inspired-character-name-generator': 'Roman Inspired Character Name Generator — Latin Names',
  'ancient-egyptian-inspired-name-generator': 'Ancient Egyptian Inspired Name Generator — Pharaoh Names',
  'iupac-name-generator': 'IUPAC Name Generator — Chemical Compound Names',
  'victorian-name-generator': 'Victorian Name Generator — Period-Accurate Names',
  'racehorse-name-generator': 'Racehorse Name Generator — Official-Style Horse Names',
};

// =============================================
// DESC_TOO_SHORT FIXES
// =============================================
const descFixes = {
  'roast-generator': 'Free Roast Generator — draft playful, opt-in-friendly roast lines with clean alternatives and off-limits reminders. Customize tone and review before use. 100% client-side.',
  'jwt-generator': 'Free JWT Generator — create and decode JSON Web Token samples with configurable headers, payloads, and algorithm selection. 100% client-side, no data stored externally.',
  'amazon-listing-generator': 'Free Amazon Listing Generator — draft product title, bullet points, and description sections with safe, review-ready copy prompts. No signup required.',
  'etsy-listing-generator': 'Free Etsy Listing Generator — create compelling Etsy product titles, tags, and description sections that attract buyers. 100% client-side and free.',
  'linkedin-summary-generator': 'Free LinkedIn Summary Generator — draft professional LinkedIn About sections for any career stage and industry. Customize tone and review before publishing.',
  'receipt-generator': 'Free Receipt Generator — create clean, itemized receipt templates with custom fields for transactions, amounts, and dates. Print-ready and 100% free.',
  'nda-generator': 'Free NDA Generator — draft Non-Disclosure Agreement outline sections with professional-review reminders. Always have a qualified attorney review before signing.',
  'product-tag-generator': 'Free Product Tag Generator — create compelling product tags and labels with specific options, key benefits, and review-ready copy. 100% client-side.',
  'pick-a-name-generator': 'Free Pick a Name Generator — randomly select a name from your list with fair, unbiased results. Great for giveaways, team selection, and decision-making.',
};

let titleFixed = 0;
let descFixed = 0;

// Apply title fixes using direct string replacement
for (const [slug, newTitle] of Object.entries(titleFixes)) {
  // Match metaTitle field for this specific tool slug
  // Find the tool block and replace its metaTitle
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Pattern: within a tool that has this slug, find the metaTitle field
  // We need to replace the metaTitle value within the correct tool block
  const slugPattern = new RegExp(`("slug":\\s*"${escapedSlug}"[\\s\\S]{0,2000}?"metaTitle":\\s*)"[^"]*"`, '');
  if (slugPattern.test(content)) {
    content = content.replace(slugPattern, `$1"${newTitle.replace(/"/g, '\\"')}"`);
    titleFixed++;
  }
}

// Apply description fixes
for (const [slug, newDesc] of Object.entries(descFixes)) {
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const descPattern = new RegExp(`("slug":\\s*"${escapedSlug}"[\\s\\S]{0,2000}?"metaDescription":\\s*)"[^"]*"`, '');
  if (descPattern.test(content)) {
    content = content.replace(descPattern, `$1"${newDesc.replace(/"/g, '\\"')}"`);
    descFixed++;
  }
}

fs.writeFileSync(toolsPath, content, 'utf8');

console.log(`✅ SEO METADATA FIXES COMPLETE`);
console.log(`   Meta titles fixed: ${titleFixed}/${Object.keys(titleFixes).length}`);
console.log(`   Meta descriptions fixed: ${descFixed}/${Object.keys(descFixes).length}`);
