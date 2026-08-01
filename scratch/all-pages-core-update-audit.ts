import fs from 'fs';
import path from 'path';

function getAllHtmlFiles(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(filePath));
    } else if (file === 'index.html') {
      results.push(filePath);
    }
  }
  return results;
}

function runAllPagesCoreUpdateAudit() {
  const distDir = path.join(process.cwd(), 'dist');
  const allHtmlFiles = getAllHtmlFiles(distDir);
  console.log(`TOTAL_PAGES_IN_DIST: ${allHtmlFiles.length}`);

  if (allHtmlFiles.length === 0) {
    console.error('ERROR: dist directory is empty or missing.');
    return;
  }

  const titles = new Map<string, string[]>();
  const descriptions = new Map<string, string[]>();
  const canonicals = new Map<string, string[]>();

  let totalPages = allHtmlFiles.length;
  let titleTruncatedCount = 0;
  let missingTitleCount = 0;
  let missingDescCount = 0;
  let missingCanonCount = 0;
  let missingHreflangCount = 0;
  let missingAuthorSchemaCount = 0;
  let missingAuthorCardCount = 0;
  let missingEditorialLinkCount = 0;
  let missingPresetsCount = 0;
  let missingInsightsCount = 0;
  let missingComparisonCount = 0;
  let missingFaqsCount = 0;
  let h1CountError = 0;

  // Track tools vs non-tools
  let toolPagesCount = 0;
  let nonToolPagesCount = 0;

  for (let i = 0; i < allHtmlFiles.length; i++) {
    const filePath = allHtmlFiles[i];
    const rel = path.relative(distDir, filePath).replace(/\\/g, '/');
    const isToolPage = rel.includes('/tools/');

    if (isToolPage) toolPagesCount++;
    else nonToolPagesCount++;

    const html = fs.readFileSync(filePath, 'utf-8');

    // 1. Meta Title
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    if (!titleMatch || !titleMatch[1].trim()) {
      missingTitleCount++;
    } else {
      const t = titleMatch[1].trim();
      if (!titles.has(t)) titles.set(t, []);
      titles.get(t)!.push(rel);
      if (t.length > 70) titleTruncatedCount++;
    }

    // 2. Meta Description
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    if (!descMatch || !descMatch[1].trim()) {
      missingDescCount++;
    } else {
      const d = descMatch[1].trim();
      if (!descriptions.has(d)) descriptions.set(d, []);
      descriptions.get(d)!.push(rel);
    }

    // 3. Canonical Tag
    const canonMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
    if (!canonMatch || !canonMatch[1].trim()) {
      missingCanonCount++;
    } else {
      const c = canonMatch[1].trim();
      if (!canonicals.has(c)) canonicals.set(c, []);
      canonicals.get(c)!.push(rel);
    }

    // 4. H1 tag sanity (Must have exactly 1 H1 tag per page)
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
    if (!h1Matches || h1Matches.length !== 1) {
      h1CountError++;
    }

    // 5. Tool-specific checks
    if (isToolPage) {
      // Hreflang links
      const hreflangMatches = html.match(/<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href="[^"]*"/gi);
      if (!hreflangMatches || hreflangMatches.length < 18) {
        missingHreflangCount++;
      }

      // Author schema & card
      if (!html.includes('"author"') || !html.includes('TapToGen Editorial Team')) {
        missingAuthorSchemaCount++;
      }
      if (!html.includes('author-eeat-card')) {
        missingAuthorCardCount++;
      }
      if (!html.includes('href="/about-us/"')) {
        missingEditorialLinkCount++;
      }

      // 4 Helpful Content Engines
      if (!html.includes('preset-examples-section') && !html.includes('Preset Examples')) {
        missingPresetsCount++;
      }
      if (!html.includes('expert-insight-section') && !html.includes('Expert Insights')) {
        missingInsightsCount++;
      }
      if (!html.includes('comparison-section') && !html.includes('Verdict:')) {
        missingComparisonCount++;
      }
      if (!html.includes('faq-question') && !html.includes('faq-item') && !html.includes('faq-container') && !html.includes('FAQ')) {
        missingFaqsCount++;
      }
    }
  }

  // Duplicate metrics
  let dupTitleCount = 0;
  for (const [t, paths] of titles.entries()) {
    if (paths.length > 1) dupTitleCount += (paths.length - 1);
  }

  let dupDescCount = 0;
  for (const [d, paths] of descriptions.entries()) {
    if (paths.length > 1) dupDescCount += (paths.length - 1);
  }

  let dupCanonCount = 0;
  for (const [c, paths] of canonicals.entries()) {
    if (paths.length > 1) dupCanonCount += (paths.length - 1);
  }

  const resultData = {
    totalPages,
    toolPagesCount,
    nonToolPagesCount,
    dupTitleCount,
    titleTruncatedCount,
    missingTitleCount,
    dupDescCount,
    missingDescCount,
    dupCanonCount,
    missingCanonCount,
    missingHreflangCount,
    h1CountError,
    missingAuthorSchemaCount,
    missingAuthorCardCount,
    missingEditorialLinkCount,
    missingPresetsCount,
    missingInsightsCount,
    missingComparisonCount,
    missingFaqsCount
  };

  fs.writeFileSync('scratch/all-pages-audit-results.json', JSON.stringify(resultData, null, 2));

  console.log(`\n==================================================`);
  console.log(`ALL-PAGE CORE UPDATE AUDIT RESULTS (${totalPages} TOTAL PAGES):`);
  console.log(`- Total Pages Inspected: ${totalPages} (${toolPagesCount} tool endpoints, ${nonToolPagesCount} hub/static pages)`);
  console.log(`- Duplicate Titles: ${dupTitleCount}`);
  console.log(`- Truncated Titles (>70 chars): ${titleTruncatedCount}`);
  console.log(`- Missing Titles: ${missingTitleCount}`);
  console.log(`- Duplicate Descriptions: ${dupDescCount}`);
  console.log(`- Missing Descriptions: ${missingDescCount}`);
  console.log(`- Duplicate Canonicals: ${dupCanonCount}`);
  console.log(`- Missing Canonicals: ${missingCanonCount}`);
  console.log(`- H1 Tag Errors (not exactly 1 H1): ${h1CountError}`);
  console.log(`- Incomplete hreflang (<18 tags on tool pages): ${missingHreflangCount}`);
  console.log(`- Missing Author Schema: ${missingAuthorSchemaCount}`);
  console.log(`- Missing Author Card HTML: ${missingAuthorCardCount}`);
  console.log(`- Missing Editorial Link (/about-us/): ${missingEditorialLinkCount}`);
  console.log(`- Missing Example Engine: ${missingPresetsCount}`);
  console.log(`- Missing Expert Insight Engine: ${missingInsightsCount}`);
  console.log(`- Missing Comparison Engine: ${missingComparisonCount}`);
  console.log(`- Missing FAQ Engine: ${missingFaqsCount}`);
  console.log(`==================================================\n`);
}

runAllPagesCoreUpdateAudit();
