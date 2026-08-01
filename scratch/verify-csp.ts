import fs from 'fs';
import path from 'path';

console.log('=== INDEPENDENT SECURITY & FORENSIC CSP AUDIT ===\n');

// 1. Inspect Vercel output config.json
const vercelConfigPath = path.join(process.cwd(), '.vercel/output/config.json');
if (fs.existsSync(vercelConfigPath)) {
  const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
  console.log('1. Vercel Config Routes Total:', vercelConfig.routes?.length);
  const secRoute = vercelConfig.routes?.find((r: any) => r.headers && r.headers['Content-Security-Policy']);
  if (secRoute) {
    const csp = secRoute.headers['Content-Security-Policy'];
    console.log('   - Security Header Policy found:', csp);
    console.log('   - Includes unsafe-inline in script-src:', csp.includes("script-src 'self' 'unsafe-inline'"));
    console.log('   - Includes unsafe-eval in script-src:', csp.includes("script-src 'self' 'unsafe-eval'"));
    console.log('   - Includes strict-dynamic:', csp.includes("'strict-dynamic'"));
  } else {
    console.log('   - WARNING: No route header with Content-Security-Policy found in config.json');
  }
} else {
  console.log('1. Vercel output config.json does not exist yet. Run npm run build.');
}

// 2. Inspect Middleware file
const middlewarePath = path.join(process.cwd(), 'middleware.js');
console.log('\n2. Middleware file presence:', fs.existsSync(middlewarePath));
if (fs.existsSync(middlewarePath)) {
  const middlewareContent = fs.readFileSync(middlewarePath, 'utf8');
  console.log('   - Middleware generates crypto nonce:', middlewareContent.includes('crypto.getRandomValues'));
  console.log('   - Middleware replaces script tags with nonce:', middlewareContent.includes('script nonce='));
  console.log('   - Includes nonce header:', middlewareContent.includes("'nonce-"));
}

// 3. Inspect dist/ compiled static HTML files for script tags and inline handlers
const distDir = path.join(process.cwd(), 'dist');
let totalScriptTags = 0;
let inlineScripts = 0;
let inlineEventHandlers = 0;
let totalPages = 0;

function scanHtml(dir: string) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      scanHtml(full);
    } else if (item === 'index.html') {
      totalPages++;
      const html = fs.readFileSync(full, 'utf-8');
      const scriptMatches = html.match(/<script\b[^>]*>/gi) || [];
      totalScriptTags += scriptMatches.length;

      const inlineHandlerMatches = html.match(/\bon[a-z]+\s*=/gi) || [];
      inlineEventHandlers += inlineHandlerMatches.length;
    }
  }
}

if (fs.existsSync(distDir)) {
  scanHtml(distDir);
  console.log('\n3. Static Build HTML Inspection (dist/):');
  console.log('   - Total HTML pages checked:', totalPages);
  console.log('   - Total script tags across sample:', totalScriptTags);
  console.log('   - Total inline event handlers (onclick, etc.):', inlineEventHandlers);
}
