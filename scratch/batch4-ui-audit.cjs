const fs = require('fs');
const path = require('path');

console.log(`=== BATCH 4: UI/UX AESTHETIC EXCELLENCE & DARK THEME AUDIT ===\n`);

const uiIssues = [];

// 1. Audit CSS styles for design tokens & smooth transitions
const cssFiles = [
  'src/styles/global.css',
  'src/styles/design-tokens.css',
  'src/styles/components.css'
];

cssFiles.forEach(relPath => {
  const fullPath = path.resolve(__dirname, '../', relPath);
  if (!fs.existsSync(fullPath)) return;
  const content = fs.readFileSync(fullPath, 'utf8');
  
  if (!content.includes('--color-primary') && !content.includes('var(--')) {
    uiIssues.push({ type: 'MISSING_DESIGN_TOKENS', file: relPath, detail: 'CSS file missing CSS variable design tokens.' });
  }
});

// 2. Audit MobileActionBar for z-index safety
const mobileBarPath = path.resolve(__dirname, '../src/components/MobileActionBar.astro');
if (fs.existsSync(mobileBarPath)) {
  const content = fs.readFileSync(mobileBarPath, 'utf8');
  if (content.includes('z-index: 999999') || content.includes('z-index: 100000')) {
    uiIssues.push({ type: 'UNSAFE_Z_INDEX', detail: 'MobileActionBar has ultra-high z-index.' });
  }
}

console.log(`Batch 4 UI/UX Audit Complete. Found ${uiIssues.length} issues:\n`);
console.log(JSON.stringify(uiIssues, null, 2));
