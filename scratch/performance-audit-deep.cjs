const fs = require('fs');
const path = require('path');

console.log(`=== AUDIT 2: CORE WEB VITALS & PERFORMANCE AUDIT ===\n`);

const perfIssues = [];

// 1. Check BaseLayout.astro for font preloading & dns-prefetch
const layoutPath = path.resolve(__dirname, '../theme/layouts/BaseLayout.astro');
if (fs.existsSync(layoutPath)) {
  const content = fs.readFileSync(layoutPath, 'utf8');
  if (!content.includes('dns-prefetch')) {
    perfIssues.push({ type: 'MISSING_DNS_PREFETCH', detail: 'BaseLayout.astro missing dns-prefetch links for third-party origins.' });
  }
  if (!content.includes('preconnect')) {
    perfIssues.push({ type: 'MISSING_PRECONNECT', detail: 'BaseLayout.astro missing preconnect links for Google Fonts.' });
  }
  if (!content.includes('display=swap')) {
    perfIssues.push({ type: 'MISSING_FONT_DISPLAY_SWAP', detail: 'Google Fonts URL missing display=swap parameter.' });
  }
}

// 2. Scan component templates for un-optimized images
const componentFiles = [
  'src/components/LocalizedToolPage.astro',
  'src/components/HubPage.astro',
  'src/components/IntroSection.astro',
  'src/components/AuthorByline.astro'
];

componentFiles.forEach(relPath => {
  const fullPath = path.resolve(__dirname, '../', relPath);
  if (!fs.existsSync(fullPath)) return;
  const content = fs.readFileSync(fullPath, 'utf8');
  
  const imgMatches = content.match(/<img[^>]+>/g);
  if (imgMatches) {
    imgMatches.forEach(img => {
      if (!img.includes('loading="lazy"') && !img.includes("loading='lazy'") && !img.includes('priority')) {
        perfIssues.push({ type: 'UNOPTIMIZED_IMAGE_LAZY_LOADING', file: relPath, snippet: img, detail: 'Image tag missing loading="lazy" attribute.' });
      }
    });
  }
});

console.log(`Performance Audit Complete. Found ${perfIssues.length} issues:\n`);
console.log(JSON.stringify(perfIssues, null, 2));
