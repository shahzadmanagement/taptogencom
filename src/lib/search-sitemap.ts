import fs from 'fs';
import path from 'path';
import { tools } from '../data/tools';
import { categories } from '../data/categories';
import { toolHubs } from '../data/hubs';
import { noindexToolSlugs } from '../data/tool-page-data';
import { localizedPilotTools, localizedPilotLanguages, getToolRoute } from '../data/localization';
import { siteConfig } from '../config/site';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

export function compileSitemapXml(urls: SitemapUrl[]): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  urls.forEach(u => {
    xml += '  <url>\n';
    xml += `    <loc>${u.loc}</loc>\n`;
    xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
    xml += `    <priority>${u.priority.toFixed(1)}</priority>\n`;
    xml += '  </url>\n';
  });
  xml += '</urlset>';
  return xml;
}

export function compileSitemapIndexXml(sitemaps: string[]): string {
  const lastmod = new Date().toISOString().split('T')[0];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  sitemaps.forEach(s => {
    xml += '  <sitemap>\n';
    xml += `    <loc>${siteConfig.url}/${s}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });
  xml += '</sitemapindex>';
  return xml;
}

export function getSitemapData() {
  const lastmod = new Date().toISOString().split('T')[0];
  const noindex = new Set(noindexToolSlugs);

  // 1. Pages (Static)
  const pages: SitemapUrl[] = [
    { loc: `${siteConfig.url}/`, lastmod, changefreq: 'daily', priority: 1.0 },
    { loc: `${siteConfig.url}/about-us/`, lastmod, changefreq: 'monthly', priority: 0.5 },
    { loc: `${siteConfig.url}/contact-us/`, lastmod, changefreq: 'monthly', priority: 0.5 },
    { loc: `${siteConfig.url}/disclaimer/`, lastmod, changefreq: 'monthly', priority: 0.3 },
    { loc: `${siteConfig.url}/privacy/`, lastmod, changefreq: 'monthly', priority: 0.3 },
    { loc: `${siteConfig.url}/terms/`, lastmod, changefreq: 'monthly', priority: 0.3 },
    { loc: `${siteConfig.url}/sitemap/`, lastmod, changefreq: 'weekly', priority: 0.4 }
  ];

  // 2. Blog
  const blog: SitemapUrl[] = [
    { loc: `${siteConfig.url}/blog/`, lastmod, changefreq: 'weekly', priority: 0.6 }
  ];

  // 3. Tools (English Indexable Only)
  const englishTools: SitemapUrl[] = tools
    .filter(t => !noindex.has(t.slug))
    .map(t => ({
      loc: `${siteConfig.url}/tools/${t.slug}/`,
      lastmod,
      changefreq: 'daily',
      priority: 0.8
    }));

  // 4. Categories (English Only)
  const categoryUrls: SitemapUrl[] = [
    { loc: `${siteConfig.url}/categories/`, lastmod, changefreq: 'weekly', priority: 0.7 },
    ...categories.map(c => ({
      loc: `${siteConfig.url}/categories/${c.slug}/`,
      lastmod,
      changefreq: 'weekly',
      priority: 0.6
    }))
  ];

  // 5. Hubs (English Only)
  const hubUrls: SitemapUrl[] = [
    { loc: `${siteConfig.url}/tools/`, lastmod, changefreq: 'weekly', priority: 0.7 },
    ...toolHubs.map(h => ({
      loc: `${siteConfig.url}/tools/${h.slug}/`,
      lastmod,
      changefreq: 'weekly',
      priority: 0.7
    }))
  ];

  // 6. Locales (All dynamic localized tool pages)
  const localeUrls: SitemapUrl[] = localizedPilotTools
    .filter(entry => !noindex.has(entry.canonicalToolId))
    .map(entry => {
      const route = getToolRoute(entry.canonicalToolId, entry.language);
      return {
        loc: `${siteConfig.url}${route}`,
        lastmod,
        changefreq: 'daily',
        priority: 0.7
      };
    });

  return {
    pages,
    blog,
    tools: englishTools,
    categories: categoryUrls,
    hubs: hubUrls,
    locales: localeUrls
  };
}

export function generateSitemaps(publicDir: string): void {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const data = getSitemapData();

  // Write XML Sitemaps
  fs.writeFileSync(path.join(publicDir, 'sitemap-pages.xml'), compileSitemapXml(data.pages));
  fs.writeFileSync(path.join(publicDir, 'sitemap-blog.xml'), compileSitemapXml(data.blog));
  fs.writeFileSync(path.join(publicDir, 'sitemap-tools.xml'), compileSitemapXml(data.tools));
  fs.writeFileSync(path.join(publicDir, 'sitemap-categories.xml'), compileSitemapXml(data.categories));
  fs.writeFileSync(path.join(publicDir, 'sitemap-hubs.xml'), compileSitemapXml(data.hubs));
  fs.writeFileSync(path.join(publicDir, 'sitemap-locales.xml'), compileSitemapXml(data.locales));

  // Write index sitemaps
  const sitemaps = [
    'sitemap-pages.xml',
    'sitemap-blog.xml',
    'sitemap-tools.xml',
    'sitemap-categories.xml',
    'sitemap-hubs.xml',
    'sitemap-locales.xml'
  ];

  const indexXml = compileSitemapIndexXml(sitemaps);
  fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), indexXml);
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexXml); // Override legacy/default sitemap.xml
}
