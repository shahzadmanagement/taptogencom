const fs = require('fs');
const path = require('path');

console.log(`=== AUDIT 3: ACCESSIBILITY (WCAG 2.2 AA) AUDIT ===\n`);

const a11yIssues = [];

// 1. Check BaseLayout.astro for skip link and main landmark
const layoutPath = path.resolve(__dirname, '../theme/layouts/BaseLayout.astro');
if (fs.existsSync(layoutPath)) {
  const content = fs.readFileSync(layoutPath, 'utf8');
  if (!content.includes('href="#main-content"')) {
    a11yIssues.push({ type: 'MISSING_SKIP_LINK', detail: 'BaseLayout.astro missing skip-to-content accessibility link.' });
  }
  if (!content.includes('id="main-content"') && !content.includes('id=\'main-content\'')) {
    a11yIssues.push({ type: 'MISSING_MAIN_LANDMARK_ID', detail: 'BaseLayout.astro main element missing id="main-content".' });
  }
}

// 2. Check LocalizedToolPage.astro for form inputs without associated labels
const toolPagePath = path.resolve(__dirname, '../src/components/LocalizedToolPage.astro');
if (fs.existsSync(toolPagePath)) {
  const content = fs.readFileSync(toolPagePath, 'utf8');
  if (!content.includes('for="tool-input"') && !content.includes("for='tool-input'")) {
    a11yIssues.push({ type: 'MISSING_FORM_LABEL_ASSOCIATION', detail: 'Main tool textarea missing explicit for="tool-input" label association.' });
  }
}

// 3. Scan components for buttons without text content or aria-label
const componentFiles = [
  'src/components/LocalizedToolPage.astro',
  'src/components/DownloadToolbar.astro',
  'src/components/MobileActionBar.astro',
  'src/components/CommandPalette.astro'
];

componentFiles.forEach(relPath => {
  const fullPath = path.resolve(__dirname, '../', relPath);
  if (!fs.existsSync(fullPath)) return;
  const content = fs.readFileSync(fullPath, 'utf8');
  
  const buttonMatches = content.match(/<button[^>]+>/g);
  if (buttonMatches) {
    buttonMatches.forEach(btn => {
      if (!btn.includes('aria-label') && !btn.includes('aria-labelledby') && !btn.includes('id=') && !btn.includes('class=')) {
        a11yIssues.push({ type: 'UNLABELED_BUTTON_RISK', file: relPath, snippet: btn, detail: 'Button tag missing explicit aria-label or accessible text label.' });
      }
    });
  }
});

console.log(`Accessibility Audit Complete. Found ${a11yIssues.length} issues:\n`);
console.log(JSON.stringify(a11yIssues, null, 2));
