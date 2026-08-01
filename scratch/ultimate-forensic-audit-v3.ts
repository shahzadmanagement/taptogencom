import fs from 'fs';
import path from 'path';

interface Defect {
  id: string;
  issue: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  file: string;
  line: number;
  component: string;
  page: string;
  htmlEvidence: string;
  sourceEvidence: string;
  whyGoogleDislikesIt: string;
  guidelineViolated: string;
  estimatedImpact: string;
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  implementationFix: string;
  verificationMethod: string;
}

function runUltimateAudit() {
  const distDir = path.join(process.cwd(), 'dist');
  const srcDir = path.join(process.cwd(), 'src');
  const defects: Defect[] = [];

  console.log('Starting Ultimate Forensic Audit v3...');

  let totalPagesChecked = 0;
  let missingCanonical = 0;
  let missingHreflang = 0;
  let missingSchema = 0;
  let englishFaqLeakageCount = 0;
  let headingHierarchyIssues = 0;
  let shortContentPages = 0;

  function scanDirectory(dir: string) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item === 'index.html') {
        totalPagesChecked++;
        const html = fs.readFileSync(fullPath, 'utf-8');
        const relPath = path.relative(distDir, fullPath).replace(/\\/g, '/');

        // Check canonical
        if (!html.includes('<link rel="canonical"')) {
          missingCanonical++;
        }

        // Check hreflang
        if (!html.includes('hreflang="x-default"')) {
          missingHreflang++;
        }

        // Check schema
        if (!html.includes('application/ld+json')) {
          missingSchema++;
        }

        // Check word count
        const textOnly = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
        const wordCount = textOnly.split(' ').length;
        if (wordCount < 200) {
          shortContentPages++;
        }

        // Check English FAQ leakage on localized endpoints
        const locales = ['es', 'fr', 'de', 'pt', 'it', 'pl', 'ru', 'tr', 'id', 'sv', 'ms', 'bg', 'hi', 'bn', 'nl', 'ja', 'ko', 'ar'];
        const isLocalized = locales.some(loc => relPath.startsWith(`${loc}/`));
        if (isLocalized && html.includes('How does the IUPAC Name Generator process data') && !relPath.includes('iupac')) {
          englishFaqLeakageCount++;
        }
      }
    }
  }

  if (fs.existsSync(distDir)) {
    scanDirectory(distDir);
  }

  console.log(`Audited ${totalPagesChecked} HTML pages in dist/.`);
  console.log(`Missing Canonical: ${missingCanonical}`);
  console.log(`Missing Hreflang x-default: ${missingHreflang}`);
  console.log(`Missing JSON-LD Schema: ${missingSchema}`);
  console.log(`English FAQ Leakage: ${englishFaqLeakageCount}`);
  console.log(`Short Content Pages (<200 words): ${shortContentPages}`);

  const report = {
    totalPagesChecked,
    missingCanonical,
    missingHreflang,
    missingSchema,
    englishFaqLeakageCount,
    shortContentPages
  };

  fs.writeFileSync('scratch/ultimate-audit-summary.json', JSON.stringify(report, null, 2));
}

runUltimateAudit();
