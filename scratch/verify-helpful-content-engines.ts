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

function verifyHelpfulContentEngines() {
  const distDir = path.join(process.cwd(), 'dist');
  const allHtmlFiles = findToolHtmlFiles(distDir);
  console.log(`TOTAL_DIST_TOOL_PAGES_FOUND: ${allHtmlFiles.length}`);

  if (allHtmlFiles.length === 0) {
    console.log('No tool pages found in dist directory yet.');
    return;
  }

  // Sample up to 100 tool pages
  const sampleCount = Math.min(100, allHtmlFiles.length);
  const step = Math.max(1, Math.floor(allHtmlFiles.length / sampleCount));
  const sampledFiles: string[] = [];
  for (let i = 0; i < allHtmlFiles.length && sampledFiles.length < sampleCount; i += step) {
    sampledFiles.push(allHtmlFiles[i]);
  }

  let presetsCount = 0;
  let insightsCount = 0;
  let comparisonsCount = 0;
  let faqsCount = 0;
  let failures = 0;

  const faqQuestionsSet = new Set<string>();
  let duplicateFaqCount = 0;

  for (const file of sampledFiles) {
    const rel = path.relative(distDir, file).replace(/\\/g, '/');
    const html = fs.readFileSync(file, 'utf-8');

    const hasPresets = html.includes('preset-examples-section') || html.includes('Input &amp; Output Preset Examples') || html.includes('Input & Output Preset Examples');
    const hasInsights = html.includes('expert-insight-section') || html.includes('Expert Insights &amp; Technical Notes') || html.includes('Expert Insights & Technical Notes');
    const hasComparison = html.includes('comparison-section') || html.includes('Verdict:');
    const hasFaqs = html.includes('Frequently Asked Questions') || html.includes('faq-section') || html.includes('faq-item') || html.includes('FAQ');

    if (hasPresets) presetsCount++;
    if (hasInsights) insightsCount++;
    if (hasComparison) comparisonsCount++;
    if (hasFaqs) faqsCount++;

    const passed = hasPresets && hasInsights && hasComparison && hasFaqs;
    if (!passed) {
      failures++;
      console.warn(`FAIL_PAGE: ${rel} (Presets: ${hasPresets}, Insights: ${hasInsights}, Comp: ${hasComparison}, FAQs: ${hasFaqs})`);
    }

    // Extract FAQ questions from HTML if present
    const faqMatches = html.match(/<button[^>]*class="faq-question"[^>]*>([\s\S]*?)<\/button>/g);
    if (faqMatches) {
      for (const m of faqMatches) {
        const cleanQ = m.replace(/<[^>]*>/g, '').trim();
        if (faqQuestionsSet.has(cleanQ)) {
          duplicateFaqCount++;
        }
        faqQuestionsSet.add(cleanQ);
      }
    }
  }

  console.log(`\n==================================================`);
  console.log(`VERIFICATION SUMMARY (${sampledFiles.length} SAMPLED PAGES):`);
  console.log(`- Preset Examples Engine Presence: ${presetsCount}/${sampledFiles.length} (${Math.round((presetsCount/sampledFiles.length)*100)}%)`);
  console.log(`- Expert Insights Engine Presence: ${insightsCount}/${sampledFiles.length} (${Math.round((insightsCount/sampledFiles.length)*100)}%)`);
  console.log(`- Comparison Engine Presence: ${comparisonsCount}/${sampledFiles.length} (${Math.round((comparisonsCount/sampledFiles.length)*100)}%)`);
  console.log(`- Unique FAQ Engine Presence: ${faqsCount}/${sampledFiles.length} (${Math.round((faqsCount/sampledFiles.length)*100)}%)`);
  console.log(`- Duplicate FAQ Question Clashes: ${duplicateFaqCount}`);
  console.log(`- TOTAL PAGE FAILURES: ${failures}`);
  console.log(`==================================================\n`);
}

verifyHelpfulContentEngines();
