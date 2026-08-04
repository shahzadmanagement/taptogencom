const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

const issues = [];

console.log(`=== BATCH C: STRUCTURAL INTEGRITY AUDIT ===\n`);

// 1. Check llms.txt for outdated count
const llmsTxt = fs.readFileSync(path.join(__dirname, '../public/llms.txt'), 'utf8');
if (llmsTxt.includes('205+')) {
  issues.push({ type: 'LLMS_COUNT_OUTDATED', detail: 'llms.txt says 205+ but should say 430+' });
  console.log(`❌ llms.txt says "205+" — should be updated to 430+`);
} else {
  console.log(`✅ llms.txt tool count looks correct`);
}

// Check if llms.txt mentions 430
if (!llmsTxt.includes('430')) {
  issues.push({ type: 'LLMS_FULL_COUNT_MISSING', detail: 'llms.txt does not mention 430 tools' });
}

// 2. Check llms-full.txt size
const llmsFullTxt = fs.readFileSync(path.join(__dirname, '../public/llms-full.txt'), 'utf8');
const toolNamesInLlms = tools.filter(t => llmsFullTxt.includes(t.name) || llmsFullTxt.includes(t.slug));
console.log(`\nllms-full.txt mentions ${toolNamesInLlms.length}/${tools.length} tool names/slugs`);
if (toolNamesInLlms.length < tools.length / 2) {
  issues.push({ type: 'LLMS_FULL_INCOMPLETE', detail: `Only ${toolNamesInLlms.length} of ${tools.length} tools referenced` });
}

// 3. Check sitemap-tools.xml
const sitemapTools = fs.readFileSync(path.join(__dirname, '../public/sitemap-tools.xml'), 'utf8');
let missingSlugs = [];
tools.forEach(tool => {
  if (!sitemapTools.includes(`/tools/${tool.slug}/`)) {
    missingSlugs.push(tool.slug);
  }
});
if (missingSlugs.length > 0) {
  issues.push({ type: 'SITEMAP_MISSING_SLUGS', detail: `${missingSlugs.length} tools missing from sitemap-tools.xml`, slugs: missingSlugs });
  console.log(`\n❌ ${missingSlugs.length} tools missing from sitemap-tools.xml`);
  missingSlugs.slice(0, 10).forEach(s => console.log(`  - ${s}`));
} else {
  console.log(`\n✅ All ${tools.length} tools present in sitemap-tools.xml`);
}

// 4. Check if og-image exists
const publicDir = path.join(__dirname, '../public');
const ogImages = fs.readdirSync(publicDir).filter(f => f.includes('og') || f.includes('social'));
console.log(`\nOG images found in /public: ${ogImages.join(', ') || 'NONE'}`);
if (ogImages.length === 0) {
  issues.push({ type: 'OG_IMAGE_MISSING', detail: 'No OG social image found in /public' });
}

// 5. Check manifest.webmanifest
const manifestStr = fs.readFileSync(path.join(__dirname, '../public/manifest.webmanifest'), 'utf8');
const manifest = JSON.parse(manifestStr);
console.log(`\nmanifest.webmanifest:`);
console.log(`  name: ${manifest.name}`);
console.log(`  start_url: ${manifest.start_url}`);
console.log(`  icons: ${manifest.icons?.length || 0}`);
if (!manifest.icons || manifest.icons.length === 0) {
  issues.push({ type: 'PWA_NO_ICONS', detail: 'manifest.webmanifest has no icons' });
}

// 6. Check favicon fallbacks
const faviconFiles = fs.readdirSync(publicDir).filter(f => f.startsWith('favicon'));
console.log(`\nFavicon files: ${faviconFiles.join(', ')}`);
if (!faviconFiles.includes('favicon.png') && !faviconFiles.find(f => f.endsWith('.png'))) {
  issues.push({ type: 'NO_PNG_FAVICON', detail: 'No PNG favicon fallback — older browsers require it' });
  console.log(`❌ No PNG favicon found — SVG-only may fail on older browsers`);
} else {
  console.log(`✅ PNG favicon exists`);
}

// 7. Check blog page
const blogPath = path.join(__dirname, '../src/pages/blog/index.astro');
const blogContent = fs.readFileSync(blogPath, 'utf8');
if (blogContent.includes('Coming Soon')) {
  issues.push({ type: 'BLOG_EMPTY', detail: 'Blog page shows "Coming Soon" — thin EEAT signal, AdSense risk' });
  console.log(`\n❌ Blog page is empty placeholder — EEAT risk`);
} else {
  console.log(`\n✅ Blog has content`);
}

// 8. Check category count in homepage vs reality
const { categories } = loadTS(path.join(__dirname, '../src/data/categories.ts'));
console.log(`\nActual categories count: ${categories?.length || 'unknown'}`);

// 9. Check relatedSlugs point to valid tools
const allSlugs = new Set(tools.map(t => t.slug));
let brokenRelated = 0;
const brokenRelatedList = [];
tools.forEach(tool => {
  if (tool.relatedSlugs) {
    tool.relatedSlugs.forEach(related => {
      if (!allSlugs.has(related)) {
        brokenRelated++;
        brokenRelatedList.push({ toolSlug: tool.slug, brokenRelated: related });
      }
    });
  }
});
console.log(`\nBroken relatedSlugs: ${brokenRelated}`);
if (brokenRelated > 0) {
  issues.push({ type: 'BROKEN_RELATED_SLUGS', detail: `${brokenRelated} relatedSlug references point to non-existent tools`, examples: brokenRelatedList.slice(0, 20) });
  brokenRelatedList.slice(0, 10).forEach(b => console.log(`  [${b.toolSlug}] → broken: ${b.brokenRelated}`));
}

console.log(`\n=== BATCH C SUMMARY ===`);
console.log(`Total issues: ${issues.length}`);
issues.forEach(i => console.log(`  [${i.type}]: ${i.detail}`));

const summary = { totalIssues: issues.length, issues, brokenRelatedList };
fs.writeFileSync(path.join(__dirname, 'batchC-results.json'), JSON.stringify(summary, null, 2));
console.log(`\n✅ Results saved to scratch/batchC-results.json`);
