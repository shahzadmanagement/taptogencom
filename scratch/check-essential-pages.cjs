const fs = require('fs');
const path = require('path');

console.log(`=== CHECKING ESSENTIAL LEGAL & TRUST PAGES IN SRC/PAGES ===\n`);

const essentialRoutes = [
  { name: 'Privacy Policy', patterns: ['privacy.astro', 'privacy-policy.astro', 'privacy/index.astro'] },
  { name: 'Terms of Service', patterns: ['terms.astro', 'terms-and-conditions.astro', 'terms/index.astro'] },
  { name: 'Cookie Policy', patterns: ['cookie-policy/index.astro', 'cookies/index.astro'] },
  { name: 'Disclaimer', patterns: ['disclaimer.astro', 'disclaimer/index.astro'] },
  { name: 'About Us', patterns: ['about-us/index.astro', 'about/index.astro'] },
  { name: 'Contact Us', patterns: ['contact-us/index.astro', 'contact/index.astro'] }
];

const pagesDir = path.resolve(__dirname, '../src/pages');

function findFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, fileList);
    } else {
      fileList.push(filePath.replace(pagesDir, '').replace(/\\/g, '/'));
    }
  });
  return fileList;
}

const existingPagePaths = findFiles(pagesDir);

const missingEssentialPages = [];

essentialRoutes.forEach(route => {
  const found = existingPagePaths.some(p => route.patterns.some(pat => p.endsWith(pat) || p.includes(pat)));
  if (!found) {
    missingEssentialPages.push(route);
  }
});

console.log(`Missing Essential Pages (${missingEssentialPages.length}):\n`);
console.log(JSON.stringify(missingEssentialPages, null, 2));
