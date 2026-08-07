const fs = require('fs');
const path = require('path');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(toolsPath, 'utf8');

console.log('Reading tools.ts, length:', content.length);

// Category mapping rules
const categoryMapping = {
  'Font & Text Style Generators': 'text-font-generators',
  'Name Generators': 'name-generators',
  'Social Media & Tag Generators': 'social-media-tools',
  'SEO & Marketing Generators': 'seo-generators',
  'Business & Brand Generators': 'business-generators',
  'Business Generators': 'business-generators',
  'Gaming & Fantasy Generators': 'gaming-generators',
  'AI Text & Writing Generators': 'ai-writing-generators',
  'Bio & Caption Generators': 'bio-caption-generators',
  'Creative & Story Generators': 'creative-generators',
  'Utility Generators': 'utility-generators',
  'Random Generators': 'random-generators',
  'Developer & Web Generators': 'developer-generators'
};

// 1. Fix truncated meta description on fancy-text-generator
content = content.replace(
  `"metaDescription": "Generate stylish fancy text with 50+ aesthetic fonts, symbols, and decorations. Copy and paste cursive, bold, gothic, small caps, and bubble styles for."`,
  `"metaDescription": "Generate stylish fancy text with 50+ aesthetic fonts, symbols, and decorations. Copy and paste cursive, bold, gothic, small caps, and bubble styles instantly."`
);

// 2. Fix short meta title on coin-flip
content = content.replace(
  `"metaTitle": "Coin Flip — Free Online Tool"`,
  `"metaTitle": "Coin Flip Generator — Free Online Coin Toss Tool"`
);

// 3. Fix self-referential relatedSlugs
// For team-name-generator:
content = content.replace(
  `"relatedSlugs": [\n      "team-name-generator",\n      "name-generator",\n      "group-name-generator",\n      "clan-name-generator"\n    ]`,
  `"relatedSlugs": [\n      "name-generator",\n      "group-name-generator",\n      "clan-name-generator"\n    ]`
);

// For baby-name-generator:
content = content.replace(
  `"relatedSlugs": [\n      "baby-name-generator",\n      "middle-name-generator",\n      "last-name-generator",\n      "name-generator"\n    ]`,
  `"relatedSlugs": [\n      "middle-name-generator",\n      "last-name-generator",\n      "name-generator"\n    ]`
);

// 4. Parse tools array objects to fix categorySlugs
// Match each tool object block in the JSON-like array
let fixedCount = 0;

content = content.replace(/\{\s*"slug":\s*"([^"]+)"[\s\S]*?\n  \}/g, (match, slug) => {
  const categoryMatch = match.match(/"category":\s*"([^"]+)"/);
  const categorySlugMatch = match.match(/"categorySlug":\s*"([^"]+)"/);

  if (categoryMatch && categorySlugMatch) {
    const category = categoryMatch[1];
    const currCatSlug = categorySlugMatch[1];

    if (currCatSlug === 'general-generators') {
      const correctCatSlug = categoryMapping[category] || 'utility-generators';
      fixedCount++;
      return match.replace(
        `"categorySlug": "${currCatSlug}"`,
        `"categorySlug": "${correctCatSlug}"`
      );
    }
  }
  return match;
});

console.log(`Updated ${fixedCount} tool objects with proper category slugs.`);

fs.writeFileSync(toolsPath, content, 'utf8');
console.log('Successfully wrote updated tools.ts');
