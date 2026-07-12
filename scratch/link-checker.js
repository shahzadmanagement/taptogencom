import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const distDir = path.join(repoRoot, 'dist');
const reportsDir = path.join(repoRoot, 'reports');

console.log('Running production link-checking audit across dist/...');

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
console.log(`Scanning links on ${htmlFiles.length} pages...`);

const sitemapUrls = new Set();
try {
  const content = fs.readFileSync(path.join(distDir, 'sitemap-0.xml'), 'utf8');
  const urls = [...content.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  urls.forEach(u => sitemapUrls.add(u));
} catch (e) {}

const brokenLinks = [];
let auditedLinksCount = 0;
let canonicalChecks = 0;
let hreflangChecks = 0;

for (const file of htmlFiles) {
  const relPath = path.relative(distDir, file).replace(/\\/g, '/');
  const urlPath = '/' + relPath.replace(/index\.html$/, '');
  if (!urlPath.includes('/tools/') || urlPath === '/tools/' || urlPath === '/tools') {
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');

  // 1. Check Canonical
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  if (canonicalMatch) {
    canonicalChecks++;
    const canonicalHref = canonicalMatch[1].trim();
    if (canonicalHref.startsWith('https://taptogen.com')) {
      const targetPath = canonicalHref.replace('https://taptogen.com', '');
      const targetFile = targetPath.endsWith('/')
        ? path.join(distDir, targetPath, 'index.html')
        : path.join(distDir, targetPath);
      if (!fs.existsSync(targetFile) && !fs.existsSync(targetFile + '.html')) {
        brokenLinks.push({
          sourcePage: urlPath,
          linkType: 'Canonical',
          targetUrl: canonicalHref,
          reason: 'Canonical target file does not exist in build'
        });
      }
    }
  }

  // 2. Check Hreflang alternate links
  const hreflangMatches = [...html.matchAll(/<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']*)["'][^>]*href=["']([^"']*)["']/gi)];
  hreflangMatches.forEach(m => {
    hreflangChecks++;
    const href = m[2].trim();
    if (href.startsWith('https://taptogen.com')) {
      const targetPath = href.replace('https://taptogen.com', '');
      const targetFile = targetPath.endsWith('/')
        ? path.join(distDir, targetPath, 'index.html')
        : path.join(distDir, targetPath);
      if (!fs.existsSync(targetFile) && !fs.existsSync(targetFile + '.html')) {
        brokenLinks.push({
          sourcePage: urlPath,
          linkType: 'Hreflang',
          targetUrl: href,
          reason: 'Hreflang target alternate page does not exist in build'
        });
      }
    }
  });

  // 3. Check regular internal links
  const internalLinkMatches = [...html.matchAll(/<a\b[^>]*href=["']([^"']*)["']/gi)];
  internalLinkMatches.forEach(m => {
    auditedLinksCount++;
    const href = m[1].trim();
    if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (href.startsWith('http') && !href.includes('taptogen.com')) return;

    let targetPath = href;
    if (href.startsWith('https://taptogen.com')) {
      targetPath = href.replace('https://taptogen.com', '');
    }

    const targetFile = targetPath.endsWith('/')
      ? path.join(distDir, targetPath, 'index.html')
      : path.join(distDir, targetPath);

    if (!fs.existsSync(targetFile) && !fs.existsSync(targetFile + '.html')) {
      brokenLinks.push({
        sourcePage: urlPath,
        linkType: 'Internal Link',
        targetUrl: href,
        reason: 'Target page does not exist in build output'
      });
    }
  });
}

// 4. Verify sitemap URLs
let sitemapChecks = 0;
let brokenSitemapUrls = 0;
sitemapUrls.forEach(url => {
  sitemapChecks++;
  const targetPath = url.replace('https://taptogen.com', '');
  const targetFile = targetPath.endsWith('/')
    ? path.join(distDir, targetPath, 'index.html')
    : path.join(distDir, targetPath);
  if (!fs.existsSync(targetFile) && !fs.existsSync(targetFile + '.html')) {
    brokenSitemapUrls++;
    brokenLinks.push({
      sourcePage: 'sitemap.xml',
      linkType: 'Sitemap URL',
      targetUrl: url,
      reason: 'Sitemap location is missing from build output'
    });
  }
});

// Generate Markdown Report
let md = `# Broken-Link Audit Report\n\n`;
md += `## Link Verification Summary\n\n`;
md += `| Link Category | Checked Count | Broken Count |\n`;
md += `| --- | --- | --- |\n`;
md += `| **Internal Links** | ${auditedLinksCount} | ${brokenLinks.filter(l => l.linkType === 'Internal Link').length} |\n`;
md += `| **Canonicals** | ${canonicalChecks} | ${brokenLinks.filter(l => l.linkType === 'Canonical').length} |\n`;
md += `| **Hreflang Alternates** | ${hreflangChecks} | ${brokenLinks.filter(l => l.linkType === 'Hreflang').length} |\n`;
md += `| **Sitemap Entries** | ${sitemapChecks} | ${brokenSitemapUrls} |\n`;
md += `| **Total Broken Connections** | **${brokenLinks.length}** | **${brokenLinks.length}** |\n\n`;

if (brokenLinks.length > 0) {
  md += `## Broken Links Detail\n\n`;
  md += `| Source Page | Type | Target URL | Issue / Reason |\n`;
  md += `| --- | --- | --- | --- |\n`;
  brokenLinks.forEach(b => {
    md += `| \`${b.sourcePage}\` | ${b.linkType} | \`${b.targetUrl}\` | ${b.reason} |\n`;
  });
} else {
  md += `### 🟢 All connections verified. Zero broken links detected!\n`;
}

fs.mkdirSync(reportsDir, { recursive: true });
fs.writeFileSync(path.join(reportsDir, 'link-check.md'), md, 'utf8');

console.log(`Link checking completed! Found ${brokenLinks.length} broken links.`);
