import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const distDir = path.join(repoRoot, 'dist');
const reportsDir = path.join(repoRoot, 'reports');

console.log('Running image optimization audit across dist/...');

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
console.log(`Auditing images on ${htmlFiles.length} pages...`);

const imageViolations = [];
let totalImagesAudited = 0;

for (const file of htmlFiles) {
  const relPath = path.relative(distDir, file).replace(/\\/g, '/');
  const urlPath = '/' + relPath.replace(/index\.html$/, '');
  const html = fs.readFileSync(file, 'utf8');

  const imgTags = [...html.matchAll(/<img\b([^>]*)>/gi)];
  imgTags.forEach(m => {
    totalImagesAudited++;
    const attrs = m[1];

    const srcMatch = attrs.match(/src=["']([^"']*)["']/i);
    const src = srcMatch ? srcMatch[1] : '';

    const altMatch = attrs.match(/alt=["']([^"']*)["']/i);
    const hasAlt = altMatch && altMatch[1].trim() !== '';

    const widthMatch = attrs.match(/width=["']([^"']*)["']/i);
    const heightMatch = attrs.match(/height=["']([^"']*)["']/i);
    const hasDimensions = !!(widthMatch && heightMatch);

    const lazyMatch = attrs.match(/loading=["']lazy["']/i);
    const isLazy = !!lazyMatch;

    const issues = [];
    if (!hasAlt) issues.push('Missing alt attribute');
    if (!hasDimensions) issues.push('Missing width/height attributes (potential layout shift)');
    if (!isLazy) issues.push('Missing loading="lazy" attribute (renders above/below fold optimization missing)');

    // Check size of local images
    if (src && !src.startsWith('http')) {
      const localPath = path.join(distDir, src.replace(/^\/+/, ''));
      if (fs.existsSync(localPath)) {
        const stats = fs.statSync(localPath);
        if (stats.size > 500 * 1024) {
          issues.push(`Oversized asset (${Math.round(stats.size / 1024)} KB, exceeds 500KB budget)`);
        }
      }
    }

    if (issues.length > 0) {
      imageViolations.push({
        page: urlPath,
        src,
        issues
      });
    }
  });
}

// Generate Markdown Report
let md = `# Image Optimization Audit Report\n\n`;
md += `## Image Optimization Summary\n\n`;
md += `| Metric | Value |\n`;
md += `| --- | --- |\n`;
md += `| **Total HTML Pages Audited** | ${htmlFiles.length} |\n`;
md += `| **Total Image Tags Found** | ${totalImagesAudited} |\n`;
md += `| **Images with Performance/SEO issues** | ${imageViolations.length} |\n`;
md += `| **Alt attribute violations** | ${imageViolations.filter(v => v.issues.some(i => i.includes('alt'))).length} |\n`;
md += `| **Dimension violations** | ${imageViolations.filter(v => v.issues.some(i => i.includes('width'))).length} |\n`;
md += `| **Lazy-loading violations** | ${imageViolations.filter(v => v.issues.some(i => i.includes('lazy'))).length} |\n`;
md += `| **Oversized image violations** | ${imageViolations.filter(v => v.issues.some(i => i.includes('Oversized'))).length} |\n\n`;

if (imageViolations.length > 0) {
  md += `## Image Violations Detail\n\n`;
  md += `*Below is a sample list of pages containing unoptimized image configurations (capped at top 50 matches).* \n\n`;
  md += `| Page Path | Image Src | Identified Optimization Warnings |\n`;
  md += `| --- | --- | --- |\n`;
  imageViolations.slice(0, 50).forEach(v => {
    md += `| \`${v.page}\` | \`${v.src}\` | ${v.issues.join('; ')} |\n`;
  });
} else {
  md += `### 🟢 All image references are optimized. Width/height, alt descriptions, and lazy-loading are present!\n`;
}

fs.mkdirSync(reportsDir, { recursive: true });
fs.writeFileSync(path.join(reportsDir, 'image-audit.md'), md, 'utf8');

console.log(`Image audit completed! Found ${imageViolations.length} image issues.`);
