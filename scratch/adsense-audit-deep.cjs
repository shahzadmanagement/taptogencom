const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

console.log(`=== RUNNING UNCOMPROMISING GOOGLE ADSENSE COMPLIANCE AUDIT ===\n`);

const adsenseIssues = [];

// 1. Check for missing disclaimers on brand/trademarked/sensitive tools
const trademarkedOrSensitiveSlugs = [
  'chatgpt-prompt-generator',
  'midjourney-prompt-generator',
  'dalle-prompt-generator',
  'youtube-tag-generator',
  'youtube-description-generator',
  'youtube-hook-generator',
  'youtube-name-generator',
  'tiktok-name-generator',
  'tiktok-caption-generator',
  'tiktok-bio-generator',
  'instagram-bio-generator',
  'instagram-caption-generator',
  'instagram-name-generator',
  'twitter-bio-generator',
  'twitter-name-generator',
  'linkedin-headline-generator',
  'linkedin-post-generator',
  'linkedin-summary-generator',
  'facebook-post-generator',
  'amazon-listing-generator',
  'shopify-product-description-generator',
  'ao3-tag-generator',
  'fortnite-name-generator',
  'minecraft-name-generator',
  'dnd-name-generator'
];

trademarkedOrSensitiveSlugs.forEach(slug => {
  const tool = tools.find(t => t.slug === slug);
  if (tool) {
    const disc = (tool.disclaimer || '').toLowerCase();
    if (!disc) {
      adsenseIssues.push({ type: 'ADSENSE_TRADEMARK_DISCLAIMER_MISSING', slug, detail: `Tool references third-party brand or platform but has no disclaimer.` });
    } else if (!disc.includes('independent') && !disc.includes('no affiliation') && !disc.includes('trademark') && !disc.includes('draft') && !disc.includes('concept') && !disc.includes('guidance')) {
      adsenseIssues.push({ type: 'ADSENSE_WEAK_TRADEMARK_DISCLAIMER', slug, detail: `Disclaimer should explicitly state non-affiliation/independent draft status to pass AdSense review.` });
    }
  }
});

// 2. Check for thin content risk (Description < 80 or FAQ count < 4)
tools.forEach(t => {
  if (!t.description || t.description.length < 80) {
    adsenseIssues.push({ type: 'ADSENSE_THIN_CONTENT_RISK', slug: t.slug, detail: 'Tool description is under 80 chars (AdSense thin content risk).' });
  }
  if (!t.faqItems || t.faqItems.length < 4) {
    adsenseIssues.push({ type: 'ADSENSE_SUBPAR_FAQ_COUNT', slug: t.slug, detail: `Tool has only ${(t.faqItems || []).length} FAQs (AdSense prefers rich FAQ pages).` });
  }
});

// 3. Check for Footer / Legal Navigation & Privacy Policy Links in BaseLayout.astro
const layoutPath = path.resolve(__dirname, '../theme/layouts/BaseLayout.astro');

if (!fs.existsSync(layoutPath)) {
  adsenseIssues.push({ type: 'ADSENSE_LAYOUT_MISSING', detail: 'BaseLayout component missing.' });
} else {
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  if (!layoutContent.includes('privacy') && !layoutContent.includes('Privacy')) {
    adsenseIssues.push({ type: 'ADSENSE_PRIVACY_LINK_MISSING', detail: 'Footer missing link to Privacy Policy.' });
  }
  if (!layoutContent.includes('terms') && !layoutContent.includes('Terms')) {
    adsenseIssues.push({ type: 'ADSENSE_TERMS_LINK_MISSING', detail: 'Footer missing link to Terms of Service.' });
  }
}

// 4. Check for Mobile Action Bar z-index / Overlap risk
const mobileBarPath = path.resolve(__dirname, '../src/components/MobileActionBar.astro');
if (fs.existsSync(mobileBarPath)) {
  const mobileContent = fs.readFileSync(mobileBarPath, 'utf8');
  if (mobileContent.includes('z-index: 999999') || mobileContent.includes('z-index: 100000')) {
    adsenseIssues.push({ type: 'ADSENSE_AD_OVERLAP_RISK', detail: 'MobileActionBar has ultra-high z-index that could cover sticky ads (AdSense policy violation).' });
  }
}

console.log(`AdSense Audit Complete. Found ${adsenseIssues.length} issues:\n`);
console.log(JSON.stringify(adsenseIssues, null, 2));
