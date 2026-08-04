const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix Meta Titles > 60 chars
content = content.replace(
  "metaTitle: 'Multiple Choice Question Generator - Practical, Editable Drafts'",
  "metaTitle: 'Multiple Choice Question Generator - Test & Quiz Ideas'"
);

content = content.replace(
  "metaTitle: 'Baby Name Generator With Last Name - Practical Generator Tool'",
  "metaTitle: 'Baby Name Generator With Last Name - Free Matching Tool'"
);

content = content.replace(
  "metaTitle: 'Ancient Greek-Inspired Name Generator - Practical Generator Tool'",
  "metaTitle: 'Ancient Greek-Inspired Name Generator - Mythology Names'"
);

// 2. Fix Short Meta Descriptions (< 70 chars)
content = content.replace(
  "metaDescription: 'Brainstorm TikTok username ideas for your profile - free & instant.'",
  "metaDescription: 'Generate creative TikTok username ideas, handle concepts, and profile names instantly. Free and customizable.'"
);

content = content.replace(
  "metaDescription: 'Brainstorm Twitter/X usernames and handles - free & instant.'",
  "metaDescription: 'Generate unique Twitter and X username ideas, handle concepts, and profile handles instantly. Free and easy.'"
);

// 3. Fix Duplicate Meta Descriptions
content = content.replace(
  "slug: 'cool-text-generator',\n    name: 'Cool Text Generator',\n    icon: 'CT',\n    tagline: 'Cool Text Generator with focused options and review notes',\n    description: 'Use Cool Text Generator to create focused draft options with your topic and constraints. Review, edit, and adapt results before use.',\n    category: 'Font & Text Style Generators',\n    categorySlug: 'text-font-generators',\n    primaryKeyword: 'cool text generator',\n    secondaryKeywords: ['cool text online', 'free cool text generator', 'font & text style generators helper', 'stylish text generator'],\n    metaTitle: 'Cool Text Generator - Practical Generator Tool',\n    metaDescription: \"Generate cool text copyable text styles for bios, captions, labels, and messages.\",",
  "slug: 'cool-text-generator',\n    name: 'Cool Text Generator',\n    icon: 'CT',\n    tagline: 'Cool Text Generator with focused options and review notes',\n    description: 'Use Cool Text Generator to create focused draft options with your topic and constraints. Review, edit, and adapt results before use.',\n    category: 'Font & Text Style Generators',\n    categorySlug: 'text-font-generators',\n    primaryKeyword: 'cool text generator',\n    secondaryKeywords: ['cool text online', 'free cool text generator', 'font & text style generators helper', 'stylish text generator'],\n    metaTitle: 'Cool Text Generator - Practical Generator Tool',\n    metaDescription: \"Generate cool copyable font styles, decorative symbols, and aesthetic text for social bios.\","
);

content = content.replace(
  "slug: 'email-name-generator',\n    name: 'Email Name Generator',\n    icon: 'EN',\n    tagline: 'Email Name Generator with focused options and review notes',\n    description: 'Use Email Name Generator to create focused draft options with your topic and constraints. Review, edit, and adapt results before use.',\n    category: 'Name Generators',\n    categorySlug: 'name-generators',\n    primaryKeyword: 'email name generator',\n    secondaryKeywords: ['email name online', 'free email name generator', 'name generators helper', 'professional email handle generator'],\n    metaTitle: 'Email Name Generator - Practical Generator Tool',\n    metaDescription: \"Generate email name ideas for characters, profiles, groups, and creative projects.\",",
  "slug: 'email-name-generator',\n    name: 'Email Name Generator',\n    icon: 'EN',\n    tagline: 'Email Name Generator with focused options and review notes',\n    description: 'Use Email Name Generator to create focused draft options with your topic and constraints. Review, edit, and adapt results before use.',\n    category: 'Name Generators',\n    categorySlug: 'name-generators',\n    primaryKeyword: 'email name generator',\n    secondaryKeywords: ['email name online', 'free email name generator', 'name generators helper', 'professional email handle generator'],\n    metaTitle: 'Email Name Generator - Practical Generator Tool',\n    metaDescription: \"Generate professional email address ideas, business handles, and formal usernames instantly.\","
);

content = content.replace(
  "slug: 'lesson-plan-generator',\n    name: 'Lesson Plan Generator',\n    icon: 'LP',\n    tagline: 'Lesson Plan Generator with focused options and review notes',\n    description: 'Use Lesson Plan Generator to create focused draft options with your topic and constraints. Review, edit, and adapt results before use.',\n    category: 'AI Text & Writing Generators',\n    categorySlug: 'ai-writing-generators',\n    primaryKeyword: 'lesson plan generator',\n    secondaryKeywords: ['lesson plan online', 'free lesson plan generator', 'ai text & writing generators helper', 'teacher curriculum planner'],\n    metaTitle: 'Lesson Plan Generator - Practical Generator Tool',\n    metaDescription: \"Generate lesson plan focused drafts for creative, business, and planning tasks.\",",
  "slug: 'lesson-plan-generator',\n    name: 'Lesson Plan Generator',\n    icon: 'LP',\n    tagline: 'Lesson Plan Generator with focused options and review notes',\n    description: 'Use Lesson Plan Generator to create focused draft options with your topic and constraints. Review, edit, and adapt results before use.',\n    category: 'AI Text & Writing Generators',\n    categorySlug: 'ai-writing-generators',\n    primaryKeyword: 'lesson plan generator',\n    secondaryKeywords: ['lesson plan online', 'free lesson plan generator', 'ai text & writing generators helper', 'teacher curriculum planner'],\n    metaTitle: 'Lesson Plan Generator - Practical Generator Tool',\n    metaDescription: \"Generate structured teacher lesson plan outlines, learning objectives, and curriculum drafts.\","
);

content = content.replace(
  "slug: 'plant-name-generator',\n    name: 'Plant Name Generator',\n    icon: 'PN',\n    tagline: 'Plant Name Generator with focused options and review notes',\n    description: 'Use Plant Name Generator to create focused draft options with your topic and constraints. Review, edit, and adapt results before use.',\n    category: 'Name Generators',\n    categorySlug: 'name-generators',\n    primaryKeyword: 'plant name generator',\n    secondaryKeywords: ['plant name online', 'free plant name generator', 'name generators helper', 'botanical name generator'],\n    metaTitle: 'Plant Name Generator - Practical Generator Tool',\n    metaDescription: \"Generate plant name ideas for characters, profiles, groups, and creative projects.\",",
  "slug: 'plant-name-generator',\n    name: 'Plant Name Generator',\n    icon: 'PN',\n    tagline: 'Plant Name Generator with focused options and review notes',\n    description: 'Use Plant Name Generator to create focused draft options with your topic and constraints. Review, edit, and adapt results before use.',\n    category: 'Name Generators',\n    categorySlug: 'name-generators',\n    primaryKeyword: 'plant name generator',\n    secondaryKeywords: ['plant name online', 'free plant name generator', 'name generators helper', 'botanical name generator'],\n    metaTitle: 'Plant Name Generator - Practical Generator Tool',\n    metaDescription: \"Generate cute houseplant nicknames, botanical species names, and garden plant labels.\","
);

content = content.replace(
  "slug: 'logo-generator',\n    name: 'Logo Generator',\n    icon: 'LG',\n    tagline: 'Logo Generator with focused options and review notes',\n    description: 'Use Logo Generator to create focused draft options with your topic and constraints. Review, edit, and adapt results before use.',\n    category: 'Business & Brand Generators',\n    categorySlug: 'business-generators',\n    primaryKeyword: 'logo generator',\n    secondaryKeywords: ['logo online', 'free logo generator', 'business & brand generators helper', 'brand mark design generator'],\n    metaTitle: 'Logo Generator - Practical Generator Tool',\n    metaDescription: \"Generate logo focused drafts for creative, business, and planning tasks.\",",
  "slug: 'logo-generator',\n    name: 'Logo Generator',\n    icon: 'LG',\n    tagline: 'Logo Generator with focused options and review notes',\n    description: 'Use Logo Generator to create focused draft options with your topic and constraints. Review, edit, and adapt results before use.',\n    category: 'Business & Brand Generators',\n    categorySlug: 'business-generators',\n    primaryKeyword: 'logo generator',\n    secondaryKeywords: ['logo online', 'free logo generator', 'business & brand generators helper', 'brand mark design generator'],\n    metaTitle: 'Logo Generator - Practical Generator Tool',\n    metaDescription: \"Generate creative logo concepts, brand icon ideas, and visual layout prompts for startups.\","
);

content = content.replace(
  "slug: 'shopify-product-description-generator',\n    name: 'Shopify Product Description Generator',\n    icon: 'SD',\n    tagline: 'Shopify Product Description Generator with focused options and review notes',\n    description: 'Use Shopify Product Description Generator to create focused draft options with your topic and constraints. Review, edit, and adapt results before use.',\n    category: 'Business & Brand Generators',\n    categorySlug: 'business-generators',\n    primaryKeyword: 'shopify product description generator',\n    secondaryKeywords: ['shopify product description online', 'free shopify product description generator', 'business & brand generators helper', 'e-commerce copy generator'],\n    metaTitle: 'Shopify Product Description Generator - Practical Tool',\n    metaDescription: \"Generate shopify product description focused drafts for creative, business, and planning tasks.\",",
  "slug: 'shopify-product-description-generator',\n    name: 'Shopify Product Description Generator',\n    icon: 'SD',\n    tagline: 'Shopify Product Description Generator with focused options and review notes',\n    description: 'Use Shopify Product Description Generator to create focused draft options with your topic and constraints. Review, edit, and adapt results before use.',\n    category: 'Business & Brand Generators',\n    categorySlug: 'business-generators',\n    primaryKeyword: 'shopify product description generator',\n    secondaryKeywords: ['shopify product description online', 'free shopify product description generator', 'business & brand generators helper', 'e-commerce copy generator'],\n    metaTitle: 'Shopify Product Description Generator - Practical Tool',\n    metaDescription: \"Generate high-converting e-commerce product copy, bullet points, and Shopify store descriptions.\","
);

content = content.replace(
  "slug: 'ancient-greek-inspired-name-generator',\n    name: 'Ancient Greek-Inspired Name Generator',\n    icon: 'AG',\n    tagline: 'Ancient Greek-Inspired Name Generator with focused options and review notes',\n    description: 'Use Ancient Greek-Inspired Name Generator to create focused draft options with your topic and constraints. Review, edit, and adapt results before use.',\n    category: 'Creative & Story Generators',\n    categorySlug: 'creative-generators',\n    primaryKeyword: 'ancient greek-inspired name generator',\n    secondaryKeywords: ['ancient greek-inspired name online', 'free ancient greek-inspired name generator', 'creative & story generators helper', 'greek mythology character names'],\n    metaTitle: 'Ancient Greek-Inspired Name Generator - Mythology Names',\n    metaDescription: \"Generate ancient greek-inspired name ideas for characters, profiles, groups, and creative projects.\",",
  "slug: 'ancient-greek-inspired-name-generator',\n    name: 'Ancient Greek-Inspired Name Generator',\n    icon: 'AG',\n    tagline: 'Ancient Greek-Inspired Name Generator with focused options and review notes',\n    description: 'Use Ancient Greek-Inspired Name Generator to create focused draft options with your topic and constraints. Review, edit, and adapt results before use.',\n    category: 'Creative & Story Generators',\n    categorySlug: 'creative-generators',\n    primaryKeyword: 'ancient greek-inspired name generator',\n    secondaryKeywords: ['ancient greek-inspired name online', 'free ancient greek-inspired name generator', 'creative & story generators helper', 'greek mythology character names'],\n    metaTitle: 'Ancient Greek-Inspired Name Generator - Mythology Names',\n    metaDescription: \"Generate classical Greek mythic hero names, deity titles, and Hellenic character concepts.\","
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Saved final SEO fixes to tools.ts');
