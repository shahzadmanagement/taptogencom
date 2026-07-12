import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const distDir = path.join(repoRoot, 'dist');
const reportsDir = path.join(repoRoot, 'reports');

console.log('Analyzing bundle sizes in dist/...');

function getFiles(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const full = path.join(dir, file);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        results = results.concat(getFiles(full));
      } else {
        results.push({
          path: full,
          size: stat.size,
          ext: path.extname(file).toLowerCase()
        });
      }
    });
  } catch (e) {}
  return results;
}

const allFiles = getFiles(distDir);

if (allFiles.length === 0) {
  console.log('No build files found. Please build the project first.');
  process.exit(0);
}

const sizes = {
  js: 0,
  css: 0,
  html: 0,
  images: 0,
  fonts: 0,
  other: 0,
  total: 0
};

const largestAssets = [];

allFiles.forEach(f => {
  sizes.total += f.size;
  
  if (['.js', '.mjs', '.cjs'].includes(f.ext)) {
    sizes.js += f.size;
  } else if (f.ext === '.css') {
    sizes.css += f.size;
  } else if (['.html', '.htm'].includes(f.ext)) {
    sizes.html += f.size;
  } else if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico'].includes(f.ext)) {
    sizes.images += f.size;
  } else if (['.woff', '.woff2', '.ttf', '.otf', '.eot'].includes(f.ext)) {
    sizes.fonts += f.size;
  } else {
    sizes.other += f.size;
  }

  largestAssets.push({
    relPath: path.relative(distDir, f.path).replace(/\\/g, '/'),
    size: f.size
  });
});

largestAssets.sort((a, b) => b.size - a.size);
const top10Largest = largestAssets.slice(0, 10);

const sizeReportPath = path.join(reportsDir, 'bundle-size.json');
let previousSizes = null;
if (fs.existsSync(sizeReportPath)) {
  try {
    previousSizes = JSON.parse(fs.readFileSync(sizeReportPath, 'utf8'));
  } catch (e) {}
}

// Write the new size json report
const newReport = {
  timestamp: new Date().toISOString(),
  sizes: {
    js: Math.round(sizes.js / 1024),
    css: Math.round(sizes.css / 1024),
    html: Math.round(sizes.html / 1024),
    images: Math.round(sizes.images / 1024),
    fonts: Math.round(sizes.fonts / 1024),
    other: Math.round(sizes.other / 1024),
    total: Math.round(sizes.total / 1024)
  },
  top10Largest
};

fs.mkdirSync(reportsDir, { recursive: true });
fs.writeFileSync(sizeReportPath, JSON.stringify(newReport, null, 2), 'utf8');

// Compare sizes
let jsGrowthPercent = 0;
let comparisonMd = '';
if (previousSizes && previousSizes.sizes) {
  const prevJs = previousSizes.sizes.js || 0;
  const newJs = newReport.sizes.js;
  if (prevJs > 0) {
    jsGrowthPercent = ((newJs - prevJs) / prevJs) * 100;
  }

  comparisonMd += `### Comparison with Previous Build\n\n`;
  comparisonMd += `| Asset Class | Previous Size (KB) | Current Size (KB) | Change (KB) | Change (%) |\n`;
  comparisonMd += `| --- | --- | --- | --- | --- |\n`;
  
  const classes = ['js', 'css', 'html', 'images', 'fonts', 'total'];
  classes.forEach(c => {
    const prevVal = previousSizes.sizes[c] || 0;
    const newVal = newReport.sizes[c] || 0;
    const diff = newVal - prevVal;
    const pct = prevVal > 0 ? ((diff / prevVal) * 100).toFixed(2) : '0.00';
    const sign = diff > 0 ? '+' : '';
    comparisonMd += `| **${c.toUpperCase()}** | ${prevVal} | ${newVal} | ${sign}${diff} | ${sign}${pct}% |\n`;
  });
  comparisonMd += '\n';
}

// Generate MD report
let md = `# Bundle Size Report\n\n`;
md += `## Build Asset Summary\n\n`;
md += `| Asset Class | Size (KB) | Percentage of Total |\n`;
md += `| --- | --- | --- |\n`;
md += `| **JavaScript** | ${newReport.sizes.js} KB | ${((sizes.js / (sizes.total || 1)) * 100).toFixed(2)}% |\n`;
md += `| **CSS** | ${newReport.sizes.css} KB | ${((sizes.css / (sizes.total || 1)) * 100).toFixed(2)}% |\n`;
md += `| **HTML** | ${newReport.sizes.html} KB | ${((sizes.html / (sizes.total || 1)) * 100).toFixed(2)}% |\n`;
md += `| **Images** | ${newReport.sizes.images} KB | ${((sizes.images / (sizes.total || 1)) * 100).toFixed(2)}% |\n`;
md += `| **Fonts** | ${newReport.sizes.fonts} KB | ${((sizes.fonts / (sizes.total || 1)) * 100).toFixed(2)}% |\n`;
md += `| **Total Build Size** | ${newReport.sizes.total} KB | 100.00% |\n\n`;

if (comparisonMd) {
  md += comparisonMd;
}

md += `## Top 10 Largest Assets\n\n`;
md += `| File Path | Size (KB) |\n`;
md += `| --- | --- |\n`;
top10Largest.forEach(asset => {
  md += `| ${asset.relPath} | ${(asset.size / 1024).toFixed(2)} KB |\n`;
});

fs.writeFileSync(path.join(reportsDir, 'bundle-size.md'), md, 'utf8');

console.log('Bundle size analysis complete!');
console.log(`Total build size: ${newReport.sizes.total} KB`);
console.log(`JS size:         ${newReport.sizes.js} KB`);

if (jsGrowthPercent > 10) {
  console.error(`\n[BUDGET FAILURE]: JavaScript bundle size grew by ${jsGrowthPercent.toFixed(2)}%, exceeding the 10% budget limit!`);
  process.exit(1);
} else {
  console.log(`JavaScript size check passed. Growth: ${jsGrowthPercent.toFixed(2)}%`);
}
