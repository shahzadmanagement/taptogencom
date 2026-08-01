import fs from 'fs';
import path from 'path';

interface AuditIssue {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFORMATIONAL';
  category: string;
  exactFile: string;
  exactLine: number;
  affectedUrls: string[];
  whyGoogleDislikesIt: string;
  violatedGuideline: string;
  expectedSeoImpact: string;
  recommendedFix: string;
  priority: 'P0' | 'P1' | 'P2' | 'P3';
}

function runAudit() {
  const issues: AuditIssue[] = [];
  const distDir = path.join(process.cwd(), 'dist');
  const locales = ['es', 'fr', 'de', 'pt', 'it', 'pl', 'ru', 'tr', 'id', 'sv', 'ms', 'bg', 'hi', 'bn', 'nl', 'ja', 'ko', 'ar'];

  if (!fs.existsSync(distDir)) {
    console.error('dist directory does not exist! Run npm run build first.');
    process.exit(1);
  }

  // Scan compiled HTML in dist/ for all 18 localized languages
  const missingAuthorPages: string[] = [];
  const missingPresetPages: string[] = [];
  const missingInsightPages: string[] = [];
  const missingComparisonPages: string[] = [];
  const iupacFaqPages: string[] = [];

  function scanDistHtml(dir: string) {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        scanDistHtml(fullPath);
      } else if (file === 'index.html' && fullPath.includes('/tools/')) {
        const html = fs.readFileSync(fullPath, 'utf-8');
        const relPath = path.relative(distDir, fullPath).replace(/\\/g, '/');

        // Check AuthorByline rendering in dist/
        if (!html.includes('author-byline') && !html.includes('Author') && !html.includes('Shahzad Ali') && !html.includes('TapToGen Editorial Team')) {
          missingAuthorPages.push(relPath);
        }

        // Check Preset Examples rendering in dist/
        if (!html.includes('preset-examples') && !html.includes('Preset Examples') && !html.includes('preset-card') && !html.includes('Example Presets')) {
          missingPresetPages.push(relPath);
        }

        // Check Expert Insights rendering in dist/
        if (!html.includes('expert-insight') && !html.includes('Expert Insights') && !html.includes('Professional Tips')) {
          missingInsightPages.push(relPath);
        }

        // Check Comparison Section rendering in dist/
        if (!html.includes('comparison-section') && !html.includes('Comparison') && !html.includes('vs Manual Work') && !html.includes('Method')) {
          missingComparisonPages.push(relPath);
        }

        // Check for English IUPAC FAQ leakage on non-English tool pages
        const isNonEnglish = locales.some(l => relPath.startsWith(`${l}/`));
        if (isNonEnglish && html.includes('How does the IUPAC Name Generator process data') && !relPath.includes('iupac')) {
          iupacFaqPages.push(relPath);
        }
      }
    }
  }

  scanDistHtml(distDir);

  if (missingAuthorPages.length > 0) {
    issues.push({
      severity: 'HIGH',
      category: 'E-E-A-T & Trust Signals',
      exactFile: 'dist/',
      exactLine: 1,
      affectedUrls: missingAuthorPages.slice(0, 10).map(p => `https://taptogen.com/${p}`),
      whyGoogleDislikesIt: `Compiled HTML pages in dist/ are missing Author attribution content.`,
      violatedGuideline: 'Google Search Quality Rater Guidelines Section 4.3',
      expectedSeoImpact: 'De-prioritization under Google E-E-A-T evaluation.',
      recommendedFix: 'Ensure AuthorByline component renders in LocalizedToolPage.astro.',
      priority: 'P1'
    });
  }

  if (missingPresetPages.length > 0) {
    issues.push({
      severity: 'HIGH',
      category: 'Google Helpful Content System',
      exactFile: 'dist/',
      exactLine: 1,
      affectedUrls: missingPresetPages.slice(0, 10).map(p => `https://taptogen.com/${p}`),
      whyGoogleDislikesIt: `Compiled HTML pages in dist/ are missing preset demonstration examples.`,
      violatedGuideline: 'Google Helpful Content Guidance',
      expectedSeoImpact: 'Classification as generic/low-information utility.',
      recommendedFix: 'Ensure PresetExamplesSection renders in LocalizedToolPage.astro.',
      priority: 'P1'
    });
  }

  if (missingInsightPages.length > 0) {
    issues.push({
      severity: 'HIGH',
      category: 'Information Gain & Originality',
      exactFile: 'dist/',
      exactLine: 1,
      affectedUrls: missingInsightPages.slice(0, 10).map(p => `https://taptogen.com/${p}`),
      whyGoogleDislikesIt: `Compiled HTML pages in dist/ are missing expert insight commentary.`,
      violatedGuideline: 'Google Search Patent - Information Gain',
      expectedSeoImpact: 'Reduced content depth score.',
      recommendedFix: 'Ensure ExpertInsightSection renders in LocalizedToolPage.astro.',
      priority: 'P1'
    });
  }

  if (missingComparisonPages.length > 0) {
    issues.push({
      severity: 'HIGH',
      category: 'Topic Authority & Search Intent',
      exactFile: 'dist/',
      exactLine: 1,
      affectedUrls: missingComparisonPages.slice(0, 10).map(p => `https://taptogen.com/${p}`),
      whyGoogleDislikesIt: `Compiled HTML pages in dist/ are missing tool comparison sections.`,
      violatedGuideline: 'Google Quality Guidelines - Comprehensive Coverage',
      expectedSeoImpact: 'Sub-optimal topic authority score.',
      recommendedFix: 'Ensure ComparisonSection renders in LocalizedToolPage.astro.',
      priority: 'P1'
    });
  }

  if (iupacFaqPages.length > 0) {
    issues.push({
      severity: 'HIGH',
      category: 'Semantic Duplication & Helpful Content',
      exactFile: 'src/data/localization.ts',
      exactLine: 949,
      affectedUrls: iupacFaqPages.slice(0, 10).map(p => `https://taptogen.com/${p}`),
      whyGoogleDislikesIt: `Non-English localized tool pages leak English IUPAC FAQ content.`,
      violatedGuideline: 'Google Helpful Content System',
      expectedSeoImpact: 'Potential thin/duplicate content flag.',
      recommendedFix: 'Use createLocalizedFaqItems in LocalizedToolPage.astro.',
      priority: 'P1'
    });
  }

  const counts = {
    CRITICAL: issues.filter(i => i.severity === 'CRITICAL').length,
    HIGH: issues.filter(i => i.severity === 'HIGH').length,
    MEDIUM: issues.filter(i => i.severity === 'MEDIUM').length,
    LOW: issues.filter(i => i.severity === 'LOW').length,
    INFORMATIONAL: issues.filter(i => i.severity === 'INFORMATIONAL').length,
  };

  console.log('==================================================');
  console.log('ULTRA ZERO-TRUST FORENSIC AUDIT REPORT V2');
  console.log('==================================================\n');
  console.log(`CRITICAL: ${counts.CRITICAL}`);
  console.log(`HIGH: ${counts.HIGH}`);
  console.log(`MEDIUM: ${counts.MEDIUM}`);
  console.log(`LOW: ${counts.LOW}`);
  console.log(`INFORMATIONAL: ${counts.INFORMATIONAL}\n`);
  console.log(`TOTAL DEFECTS: ${issues.length}`);
  console.log('==================================================\n');

  fs.writeFileSync('scratch/audit-issues-output.json', JSON.stringify(issues, null, 2));
  console.log('Saved detailed audit issue list to scratch/audit-issues-output.json\n');
}

runAudit();
