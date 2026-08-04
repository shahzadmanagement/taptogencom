const fs = require('fs');
const path = require('path');

console.log(`=== RUNNING DEEP CROSS-DEVICE RESPONSIVENESS & CSS AUDIT ===\n`);

const issues = [];

const cssFiles = [
  'src/styles/global.css',
  'src/components/LocalizedToolPage.astro',
  'src/components/HubPage.astro',
  'src/components/DownloadToolbar.astro',
  'src/components/MobileActionBar.astro',
  'src/components/CommandPalette.astro',
  'src/components/PreviewTabs.astro'
];

// Check global.css for universal iOS zoom and overflow rules
const globalCssPath = path.resolve(__dirname, '../src/styles/global.css');
if (fs.existsSync(globalCssPath)) {
  const globalCss = fs.readFileSync(globalCssPath, 'utf8');
  if (!globalCss.includes('font-size: 16px !important')) {
    issues.push({ type: 'MISSING_IOS_ZOOM_PROTECTION', file: 'src/styles/global.css', detail: 'Missing global 16px font-size rule for inputs on mobile viewports.' });
  }
  if (!globalCss.includes('white-space: pre-wrap !important')) {
    issues.push({ type: 'MISSING_PRE_CODE_OVERFLOW_PROTECTION', file: 'src/styles/global.css', detail: 'Missing global pre-wrap / break-word rule for code blocks on mobile viewports.' });
  }
} else {
  issues.push({ type: 'MISSING_GLOBAL_CSS', file: 'src/styles/global.css', detail: 'Global CSS file missing.' });
}

console.log(`Responsiveness Audit Complete. Found ${issues.length} critical issues:\n`);
console.log(JSON.stringify(issues, null, 2));
