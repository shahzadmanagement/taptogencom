import fs from 'fs';
import path from 'path';

function findToolHtmlFiles(dir: string): string[] {
  let results: string[] = [];
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

function verifyDistPages() {
  const distDir = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distDir)) {
    console.log('dist directory not found');
    return;
  }

  const allHtmlFiles = findToolHtmlFiles(distDir);
  console.log(`TOTAL_TOOL_PAGES_FOUND_IN_DIST: ${allHtmlFiles.length}`);

  // Group by language prefix
  const langPages: Record<string, string[]> = {};
  for (const f of allHtmlFiles) {
    const rel = path.relative(distDir, f).replace(/\\/g, '/');
    const parts = rel.split('/');
    const lang = parts.length > 2 && parts[0] !== 'tools' ? parts[0] : 'en';
    if (!langPages[lang]) langPages[lang] = [];
    langPages[lang].push(f);
  }

  const verificationResults: {
    file: string;
    lang: string;
    hasAuthorCardClass: boolean;
    hasAuthorText: boolean;
    hasJsonLdAuthor: boolean;
    hasEditorialLink: boolean;
    passed: boolean;
  }[] = [];

  let failCount = 0;

  // Sample 2 tool pages per language across all 18 locales
  for (const [lang, pages] of Object.entries(langPages)) {
    if (pages.length > 0) {
      const samples = [pages[0], pages[Math.floor(pages.length / 2)]].filter(Boolean);
      for (const file of samples) {
        const rel = path.relative(distDir, file).replace(/\\/g, '/');
        const html = fs.readFileSync(file, 'utf-8');

        const hasAuthorCardClass = html.includes('author-eeat-card');
        const hasAuthorText = html.includes('Written &amp; Reviewed by') || html.includes('Written & Reviewed by');
        const hasJsonLdAuthor = html.includes('"author"') && html.includes('TapToGen Editorial Team');
        const hasEditorialLink = html.includes('/about-us/');

        const passed = hasAuthorCardClass && hasAuthorText && hasJsonLdAuthor && hasEditorialLink;
        if (!passed) failCount++;

        verificationResults.push({
          file: rel,
          lang,
          hasAuthorCardClass,
          hasAuthorText,
          hasJsonLdAuthor,
          hasEditorialLink,
          passed
        });
      }
    }
  }

  console.log(`SAMPLED_PAGES_COUNT: ${verificationResults.length}`);
  console.log(`TOTAL_FAILURES: ${failCount}`);
  console.log(JSON.stringify(verificationResults, null, 2));
}

verifyDistPages();
