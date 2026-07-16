import fs from 'fs';
import path from 'path';

const docsDir = path.join(process.cwd(), 'docs');
const files = fs.readdirSync(docsDir);

const patternsToKeep = ['seo', 'sitemap', 'robots', 'structured', 'deployment'];

files.forEach(file => {
  const lower = file.toLowerCase();
  const keep = patternsToKeep.some(p => lower.includes(p));
  if (!keep) {
    fs.unlinkSync(path.join(docsDir, file));
    console.log(`Deleted: ${file}`);
  }
});
