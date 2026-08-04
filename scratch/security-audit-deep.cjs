const fs = require('fs');
const path = require('path');

console.log(`=== AUDIT 1: SECURITY & XSS VULNERABILITY AUDIT ===\n`);

const securityIssues = [];

// 1. Check Security Headers in Vercel Redirects / Headers Patch Script
const vercelScriptPath = path.resolve(__dirname, '../scripts/patch-vercel-redirects.mjs');
if (fs.existsSync(vercelScriptPath)) {
  const content = fs.readFileSync(vercelScriptPath, 'utf8');
  const requiredHeaders = [
    'X-Content-Type-Options',
    'X-Frame-Options',
    'X-XSS-Protection',
    'Referrer-Policy',
    'Content-Security-Policy',
    'Strict-Transport-Security'
  ];
  
  requiredHeaders.forEach(hdr => {
    if (!content.includes(hdr)) {
      securityIssues.push({ type: 'MISSING_SECURITY_HEADER', header: hdr, detail: `Security header "${hdr}" missing from patch-vercel-redirects.mjs.` });
    }
  });
} else {
  securityIssues.push({ type: 'MISSING_VERCEL_PATCH_SCRIPT', detail: 'scripts/patch-vercel-redirects.mjs does not exist.' });
}

// 2. Scan Client Scripts for Unsanitized innerHTML Injections
const scriptFiles = [
  'src/scripts/tool-workspace.ts',
  'src/components/CommandPalette.astro',
  'src/components/LocalizedToolPage.astro',
  'src/lib/helpful-content-engine.ts'
];

scriptFiles.forEach(relPath => {
  const fullPath = path.resolve(__dirname, '../', relPath);
  if (!fs.existsSync(fullPath)) return;
  const content = fs.readFileSync(fullPath, 'utf8');
  
  // Look for innerHTML assignments without escapeHtml / textContent
  const innerHtmlMatches = content.match(/\.innerHTML\s*=\s*[^;\n]+/g);
  if (innerHtmlMatches) {
    innerHtmlMatches.forEach(match => {
      if (!match.includes('escapeHtml') && !match.includes('JSON.stringify') && !match.includes('template') && !match.includes('map(') && !match.includes('svg')) {
        securityIssues.push({ type: 'UNSANITIZED_INNERHTML_RISK', file: relPath, snippet: match, detail: 'Potential XSS risk: innerHTML assignment without explicit sanitization.' });
      }
    });
  }
});

console.log(`Security Audit Complete. Found ${securityIssues.length} issues:\n`);
console.log(JSON.stringify(securityIssues, null, 2));
