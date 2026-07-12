import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const distDir = path.join(repoRoot, 'dist');
const reportsDir = path.join(repoRoot, 'reports');

console.log('Starting production-grade SEO audit...');

// Helper to find all HTML files recursively
function getHtmlFiles(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const full = path.join(dir, file);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        results = results.concat(getHtmlFiles(full));
      } else if (file.endsWith('.html')) {
        results.push(full);
      }
    });
  } catch (e) {}
  return results;
}

const htmlFiles = getHtmlFiles(distDir);
console.log(`Discovered ${htmlFiles.length} HTML files to audit.`);

if (htmlFiles.length === 0) {
  console.log('No HTML files found to audit. Please run "npm run build" first.');
  process.exit(0);
}

// Load sitemap URLs
const sitemapUrls = new Set();
try {
  const sitemapIndexContent = fs.readFileSync(path.join(distDir, 'sitemap-index.xml'), 'utf8');
  const sitemapLocs = [...sitemapIndexContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  for (const loc of sitemapLocs) {
    const sitemapFile = path.basename(loc);
    const sitemapPath = path.join(distDir, sitemapFile);
    if (fs.existsSync(sitemapPath)) {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      const urls = [...content.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
      urls.forEach(u => sitemapUrls.add(u));
    }
  }
} catch (e) {
  try {
    const content = fs.readFileSync(path.join(distDir, 'sitemap-0.xml'), 'utf8');
    const urls = [...content.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    urls.forEach(u => sitemapUrls.add(u));
  } catch (err) {}
}
console.log(`Loaded ${sitemapUrls.size} URLs from sitemap.`);

const auditResults = [];
const titleMap = new Map();
const descMap = new Map();
const allUrls = new Set();

// Pass 1: Parse metadata
for (const file of htmlFiles) {
  const relPath = path.relative(distDir, file).replace(/\\/g, '/');
  const urlPath = '/' + relPath.replace(/index\.html$/, '');
  if (!urlPath.includes('/tools/') || urlPath === '/tools/' || urlPath === '/tools') {
    continue;
  }
  const pageUrl = `https://taptogen.com${urlPath}`;
  allUrls.add(urlPath);
  allUrls.add(pageUrl);

  const html = fs.readFileSync(file, 'utf8');

  // Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // Description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const description = descMatch ? descMatch[1].trim() : '';

  // Canonical
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

  // Robots
  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
  const robots = robotsMatch ? robotsMatch[1].trim() : '';

  // Open Graph
  const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i);
  const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i);
  const ogUrlMatch = html.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']*)["']/i);
  const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i);

  // Twitter
  const twitterCardMatch = html.match(/<meta[^>]*name=["']twitter:card["'][^>]*content=["']([^"']*)["']/i);
  const twitterTitleMatch = html.match(/<meta[^>]*name=["']twitter:title["'][^>]*content=["']([^"']*)["']/i);

  // H1 Tag Count
  const h1Matches = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  const h1Count = h1Matches.length;

  // JSON-LD Schemas
  const jsonLdScripts = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
  let hasFaqSchema = false;
  let hasBreadcrumbSchema = false;
  let hasWebAppSchema = false;

  jsonLdScripts.forEach(script => {
    try {
      const data = JSON.parse(script);
      const checkSchemaType = (obj) => {
        if (!obj) return;
        if (Array.isArray(obj)) {
          obj.forEach(checkSchemaType);
          return;
        }
        const type = obj['@type'];
        if (type === 'FAQPage') hasFaqSchema = true;
        if (type === 'BreadcrumbList') hasBreadcrumbSchema = true;
        if (type === 'WebApplication') hasWebAppSchema = true;
        if (obj['@graph']) checkSchemaType(obj['@graph']);
      };
      checkSchemaType(data);
    } catch (e) {}
  });

  // Alt Tags in Images
  const imgTags = [...html.matchAll(/<img\b([^>]*)>/gi)].map(m => m[1]);
  let imagesWithoutAlt = 0;
  imgTags.forEach(attr => {
    if (!/alt=["']/i.test(attr) || /alt=["']\s*["']/i.test(attr)) {
      imagesWithoutAlt++;
    }
  });

  // Hreflang Alternates
  const hreflangs = [...html.matchAll(/<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']*)["'][^>]*href=["']([^"']*)["']/gi)].map(m => ({
    lang: m[1],
    href: m[2]
  }));

  // Internal Links
  const internalLinks = [...html.matchAll(/<a\b[^>]*href=["']([^"']*)["']/gi)]
    .map(m => m[1].trim())
    .filter(href => {
      if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
      if (href.startsWith('http') && !href.includes('taptogen.com')) return false;
      return true;
    });

  // Word Count
  const textContent = html.replace(/<script[\s\S]*?<\/script>/gi, '')
                          .replace(/<style[\s\S]*?<\/style>/gi, '')
                          .replace(/<[^>]*>/g, ' ')
                          .replace(/\s+/g, ' ')
                          .trim();
  const wordCount = textContent.split(' ').filter(Boolean).length;

  if (title) {
    if (!titleMap.has(title)) titleMap.set(title, []);
    titleMap.get(title).push(urlPath);
  }
  if (description) {
    if (!descMap.has(description)) descMap.set(description, []);
    descMap.get(description).push(urlPath);
  }

  auditResults.push({
    file,
    relPath,
    urlPath,
    pageUrl,
    title,
    description,
    canonical,
    robots,
    ogTitle: ogTitleMatch ? ogTitleMatch[1] : '',
    ogDesc: ogDescMatch ? ogDescMatch[1] : '',
    ogUrl: ogUrlMatch ? ogUrlMatch[1] : '',
    ogImage: ogImageMatch ? ogImageMatch[1] : '',
    twitterCard: twitterCardMatch ? twitterCardMatch[1] : '',
    twitterTitle: twitterTitleMatch ? twitterTitleMatch[1] : '',
    h1Count,
    hasFaqSchema,
    hasBreadcrumbSchema,
    hasWebAppSchema,
    imagesWithoutAlt,
    hreflangs,
    internalLinks,
    wordCount,
  });
}

// Pass 2: Duplicate verification and Score calculation
const finalReport = [];
const duplicateTitlesList = [];
const duplicateDescsList = [];

for (const [title, paths] of titleMap.entries()) {
  if (paths.length > 1) {
    duplicateTitlesList.push({ title, pages: paths });
  }
}
for (const [desc, paths] of descMap.entries()) {
  if (paths.length > 1) {
    duplicateDescsList.push({ description: desc, pages: paths });
  }
}

let totalScoreSum = 0;

for (const p of auditResults) {
  let score = 100;
  const errors = [];
  const warnings = [];

  // Title missing
  if (!p.title) {
    score -= 20;
    errors.push('Missing <title> tag');
  }

  // Description missing
  if (!p.description) {
    score -= 20;
    errors.push('Missing meta description');
  }

  // Canonical missing
  if (!p.canonical) {
    score -= 15;
    errors.push('Missing canonical URL link element');
  }

  // Robots missing
  if (!p.robots) {
    score -= 5;
    warnings.push('Missing robots meta tag');
  }

  // Open Graph checks
  if (!p.ogTitle || !p.ogDesc || !p.ogUrl || !p.ogImage) {
    score -= 10;
    errors.push('Incomplete Open Graph tags');
  }

  // Twitter Card checks
  if (!p.twitterCard || !p.twitterTitle) {
    score -= 5;
    warnings.push('Missing Twitter Card tags');
  }

  // Schema checks
  if (!p.hasWebAppSchema && !p.hasBreadcrumbSchema) {
    score -= 15;
    errors.push('Missing JSON-LD structured data');
  }

  // H1 checks
  if (p.h1Count === 0) {
    score -= 15;
    errors.push('No H1 heading found');
  } else if (p.h1Count > 1) {
    score -= 10;
    errors.push(`Multiple H1 headings found (${p.h1Count})`);
  }

  // Alt attributes
  if (p.imagesWithoutAlt > 0) {
    const penalty = Math.min(10, p.imagesWithoutAlt * 2);
    score -= penalty;
    errors.push(`${p.imagesWithoutAlt} image(s) missing alt attribute`);
  }

  // Sitemap inclusion
  const isExcluded = p.urlPath.includes('noindex') || p.robots.includes('noindex');
  const inSitemap = sitemapUrls.has(p.pageUrl) || sitemapUrls.has(p.pageUrl + '/');
  if (!isExcluded && !inSitemap) {
    score -= 5;
    warnings.push('Page not in sitemap.xml');
  }

  // Hreflang checks
  if (p.hreflangs.length === 0 && !isExcluded) {
    score -= 10;
    errors.push('Missing alternate hreflangs link metadata');
  }

  // Word count check
  if (p.wordCount < 100) {
    score -= 5;
    warnings.push(`Low text density page (${p.wordCount} words)`);
  }

  // Duplicate checks
  const hasDupTitle = titleMap.get(p.title)?.length > 1;
  const hasDupDesc = descMap.get(p.description)?.length > 1;
  if (hasDupTitle) {
    score -= 10;
    errors.push('Duplicate page title');
  }
  if (hasDupDesc) {
    score -= 10;
    errors.push('Duplicate meta description');
  }

  score = Math.max(0, score);
  totalScoreSum += score;

  finalReport.push({
    slug: path.basename(path.dirname(p.file)) || 'root',
    urlPath: p.urlPath,
    score,
    errors,
    warnings,
    isExcludedFromSitemap: !inSitemap,
    wordCount: p.wordCount,
    hasFaqSchema: p.hasFaqSchema,
    hasBreadcrumbSchema: p.hasBreadcrumbSchema,
    hasWebAppSchema: p.hasWebAppSchema
  });
}

const avgScore = totalScoreSum / auditResults.length;
const sortedByScore = [...finalReport].sort((a, b) => a.score - b.score);
const lowestScoring = sortedByScore.slice(0, 10);
const missingSchemaList = finalReport.filter(r => !r.hasFaqSchema && !r.hasBreadcrumbSchema && !r.hasWebAppSchema);
const sitemapExcludedList = finalReport.filter(r => r.isExcludedFromSitemap);

// Write reports
fs.mkdirSync(reportsDir, { recursive: true });

// 1. JSON Report
fs.writeFileSync(path.join(reportsDir, 'seo-audit.json'), JSON.stringify({
  summary: {
    totalAudited: auditResults.length,
    averageSeoScore: parseFloat(avgScore.toFixed(2)),
    duplicateTitlesCount: duplicateTitlesList.length,
    duplicateDescsCount: duplicateDescsList.length,
    missingSchemaCount: missingSchemaList.length,
    pagesExcludedFromSitemapCount: sitemapExcludedList.length
  },
  duplicateTitles: duplicateTitlesList,
  duplicateDescriptions: duplicateDescsList,
  results: finalReport
}, null, 2), 'utf8');

// 2. MD Report
let mdReport = `# SEO Audit System Report\n\n`;
mdReport += `## Summary Dashboard\n\n`;
mdReport += `| Metric | Value |\n`;
mdReport += `| --- | --- |\n`;
mdReport += `| **Total Pages Audited** | ${auditResults.length} |\n`;
mdReport += `| **Average SEO Score** | ${avgScore.toFixed(2)} / 100 |\n`;
mdReport += `| **Duplicate Page Titles** | ${duplicateTitlesList.length} |\n`;
mdReport += `| **Duplicate Meta Descriptions** | ${duplicateDescsList.length} |\n`;
mdReport += `| **Pages Excluded from Sitemap** | ${sitemapExcludedList.length} |\n`;
mdReport += `| **Pages Missing Structured Schema** | ${missingSchemaList.length} |\n\n`;

mdReport += `## Lowest Scoring Pages\n\n`;
mdReport += `| Slug | Path | Score | Key Issues |\n`;
mdReport += `| --- | --- | --- | --- |\n`;
lowestScoring.forEach(p => {
  mdReport += `| ${p.slug} | [${p.urlPath}](file:///dist${p.urlPath}index.html) | ${p.score} | ${p.errors.slice(0, 2).concat(p.warnings.slice(0, 2)).join('; ')} |\n`;
});

fs.writeFileSync(path.join(reportsDir, 'seo-audit.md'), mdReport, 'utf8');

// 3. Scoreboard Report
let scoreboard = `# SEO Scoreboard Dashboard\n\n`;
scoreboard += `## Performance Distribution by Tool Pages\n\n`;
scoreboard += `| Tool Slug | URL Path | Score | Word Count | Status |\n`;
scoreboard += `| --- | --- | --- | --- | --- |\n`;
finalReport.forEach(p => {
  const status = p.errors.length === 0 ? '🟢 Perfect' : `🔴 ${p.errors.length} errors`;
  scoreboard += `| ${p.slug} | ${p.urlPath} | **${p.score}** | ${p.wordCount} | ${status} |\n`;
});

fs.writeFileSync(path.join(reportsDir, 'seo-scoreboard.md'), scoreboard, 'utf8');

console.log('\n==================================================');
console.log('            SEO AUDIT REPORT COMPLETE');
console.log('==================================================');
console.log(`Total Pages Audited: ${auditResults.length}`);
console.log(`Average SEO Score:   ${avgScore.toFixed(2)}`);
console.log(`Duplicate Titles:    ${duplicateTitlesList.length}`);
console.log(`Duplicate Descs:     ${duplicateDescsList.length}`);
console.log(`Missing Schema:      ${missingSchemaList.length}`);
console.log('==================================================\n');
