import fs from 'fs';
import path from 'path';

const robotsTxt = `# http://www.robotstxt.org/

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://taptogen.com/sitemap.xml
`;

const targetPath = path.join(process.cwd(), 'public', 'robots.txt');
fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.writeFileSync(targetPath, robotsTxt);

console.log('Generated robots.txt at public/robots.txt');
