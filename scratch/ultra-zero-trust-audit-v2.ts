import fs from 'fs';
import path from 'path';

function findToolHtmlFiles(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findToolHtmlFiles(filePath));
    } else if (file === 'index.html' && filePath.replace(/\\/g, '/').includes('/tools/')) {
      results.push(filePath);
    }
  });
  return results;
}

function runUltraForensicAudit() {
  const distDir = path.join(process.cwd(), 'dist');
  const allToolFiles = findToolHtmlFiles(distDir);
  console.log(`TOTAL_DIST_TOOL_PAGES: ${allToolFiles.length}`);

  if (allToolFiles.length === 0) {
    console.error('ERROR: dist directory is empty or missing.');
    return;
  }

  // Randomly sample 320 tool pages across locales
  const sampleTarget = Math.min(320, allToolFiles.length);
  const step = Math.max(1, Math.floor(allToolFiles.length / sampleTarget));
  const sampledFiles: string[] = [];
  for (let i = 0; i < allToolFiles.length && sampledFiles.length < sampleTarget; i += step) {
    sampledFiles.push(allToolFiles[i]);
  }

  console.log(`AUDITING_${sampledFiles.length}_SAMPLED_HTML_PAGES...`);

  // Tracking metrics
  const titles = new Map<string, string[]>();
  const descriptions = new Map<string, string[]>();
  const canonicals = new Map<string, string[]>();

  let titleTruncatedCount = 0;
  let missingAuthorSchemaCount = 0;
  let missingAuthorCardCount = 0;
  let missingEditorialLinkCount = 0;
  let missingPresetsCount = 0;
  let missingInsightsCount = 0;
  let missingComparisonCount = 0;
  let missingFaqsCount = 0;
  let invalidHreflangCount = 0;

  // Semantic FAQ tracking
  const semanticFaqMap = new Map<string, string[]>();

  for (const filePath of sampledFiles) {
    const rel = path.relative(distDir, filePath).replace(/\\/g, '/');
    const html = fs.readFileSync(filePath, 'utf-8');

    // 1. Meta Title Check
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    if (title) {
      if (!titles.has(title)) titles.set(title, []);
      titles.get(title)!.push(rel);
      if (title.length > 70) titleTruncatedCount++;
    }

    // 2. Meta Description Check
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    const desc = descMatch ? descMatch[1].trim() : '';
    if (desc) {
      if (!descriptions.has(desc)) descriptions.set(desc, []);
      descriptions.get(desc)!.push(rel);
    }

    // 3. Canonical Tag Check
    const canonMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
    const canon = canonMatch ? canonMatch[1].trim() : '';
    if (canon) {
      if (!canonicals.has(canon)) canonicals.set(canon, []);
      canonicals.get(canon)!.push(rel);
    }

    // 4. hreflang Clusters Check
    const hreflangMatches = html.match(/<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href="[^"]*"/gi);
    if (!hreflangMatches || hreflangMatches.length < 18) {
      invalidHreflangCount++;
    }

    // 5. Author Schema & Card
    if (!html.includes('"author"') || !html.includes('TapToGen Editorial Team')) {
      missingAuthorSchemaCount++;
    }
    if (!html.includes('author-eeat-card')) {
      missingAuthorCardCount++;
    }
    if (!html.includes('href="/about-us/"')) {
      missingEditorialLinkCount++;
    }

    // 6. Engines
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

    // 7. Semantic FAQ extraction
    const faqBtns = html.match(/<button[^>]*class="[^"]*faq-question[^"]*"[^>]*>([\s\S]*?)<\/button>/g);
    if (faqBtns) {
      for (const btn of faqBtns) {
        const qText = btn.replace(/<[^>]*>/g, '').trim().toLowerCase();
        const tokens = qText.replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 3).sort().join(' ');
        if (tokens) {
          if (!semanticFaqMap.has(tokens)) semanticFaqMap.set(tokens, []);
          semanticFaqMap.get(tokens)!.push(rel);
        }
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

  let semanticFaqClashes = 0;
  for (const [tok, paths] of semanticFaqMap.entries()) {
    if (paths.length > 5) {
      semanticFaqClashes++;
    }
  }

  console.log(`\n==================================================`);
  console.log(`ULTRA FORENSIC AUDIT RESULTS (${sampledFiles.length} SAMPLED PAGES):`);
  console.log(`- Meta Title Duplications: ${dupTitleCount}`);
  console.log(`- Meta Title Truncations (>70 chars): ${titleTruncatedCount}`);
  console.log(`- Meta Description Duplications: ${dupDescCount}`);
  console.log(`- Canonical Tag Clashes: ${dupCanonCount}`);
  console.log(`- Incomplete hreflang Clusters (<18 tags): ${invalidHreflangCount}`);
  console.log(`- Missing Author Schema: ${missingAuthorSchemaCount}`);
  console.log(`- Missing Author Card HTML: ${missingAuthorCardCount}`);
  console.log(`- Missing Editorial Links (/about-us/): ${missingEditorialLinkCount}`);
  console.log(`- Missing Example Engine Render: ${missingPresetsCount}`);
  console.log(`- Missing Expert Insight Engine Render: ${missingInsightsCount}`);
  console.log(`- Missing Comparison Engine Render: ${missingComparisonCount}`);
  console.log(`- Missing FAQ Engine Render: ${missingFaqsCount}`);
  console.log(`- Semantic FAQ Clashes (across >5 tools): ${semanticFaqClashes}`);
  console.log(`==================================================\n`);
}

runUltraForensicAudit();
