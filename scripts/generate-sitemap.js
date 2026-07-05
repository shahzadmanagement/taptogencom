import fs from 'fs';
import path from 'path';

const entries = [
  'fancy-text-generator',
  'bold-text-generator',
  'cursive-text-generator',
  'italic-text-generator',
  'underline-text-generator',
  'strikethrough-text-generator',
  'vaporwave-text-generator',
  'unicode-text-generator'
];

const today = new Date().toISOString().split('T')[0];

const urlsXml = entries.map(slug => {
  return `  <url>
    <loc>https://taptogen.com/tools/${slug}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
}).join('\n');

const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

const targetPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.writeFileSync(targetPath, xmlContent);

console.log(`Generated sitemap.xml at public/sitemap.xml containing ${entries.length} urls.`);
