import fs from 'fs';
import path from 'path';
import { tools } from '../data/tools';
import { categories } from '../data/categories';
import { toolHubs } from '../data/hubs';
import { noindexToolSlugs } from '../data/tool-page-data';
import { localizedPilotTools, getToolRoute } from '../data/localization';
import { siteConfig } from '../config/site';
import { getImageMetadata } from './search-image-seo';
import { resolveCanonicalUrl } from './search-canonical';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

interface SitemapImageUrl {
  loc: string;
  imageLoc: string;
  imageTitle: string;
  imageCaption: string;
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

export function compileImageSitemapXml(urls: SitemapImageUrl[]): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  urls.forEach(u => {
    xml += '  <url>\n';
    xml += `    <loc>${u.loc}</loc>\n`;
    xml += '    <image:image>\n';
    xml += `      <image:loc>${u.imageLoc}</image:loc>\n`;
    xml += `      <image:title>${u.imageTitle}</image:title>\n`;
    xml += `      <image:caption>${u.imageCaption}</image:caption>\n`;
    xml += '    </image:image>\n';
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
    { loc: resolveCanonicalUrl('/'), lastmod, changefreq: 'daily', priority: 1.0 },
    { loc: resolveCanonicalUrl('/about-us/'), lastmod, changefreq: 'monthly', priority: 0.5 },
    { loc: resolveCanonicalUrl('/contact-us/'), lastmod, changefreq: 'monthly', priority: 0.5 },
    { loc: resolveCanonicalUrl('/disclaimer/'), lastmod, changefreq: 'monthly', priority: 0.3 },
    { loc: resolveCanonicalUrl('/privacy/'), lastmod, changefreq: 'monthly', priority: 0.3 },
    { loc: resolveCanonicalUrl('/terms/'), lastmod, changefreq: 'monthly', priority: 0.3 },
    { loc: resolveCanonicalUrl('/sitemap/'), lastmod, changefreq: 'weekly', priority: 0.4 }
  ];

  // 2. Blog
  const blog: SitemapUrl[] = [
    { loc: resolveCanonicalUrl('/blog/'), lastmod, changefreq: 'weekly', priority: 0.6 }
  ];

  // 3. Tools (English Indexable Only)
  const englishTools: SitemapUrl[] = tools
    .filter(t => !noindex.has(t.slug))
    .map(t => ({
      loc: resolveCanonicalUrl(`/tools/${t.slug}/`),
      lastmod,
      changefreq: 'daily',
      priority: 0.8
    }));

  // 4. Categories (English Only)
  const categoryUrls: SitemapUrl[] = [
    { loc: resolveCanonicalUrl('/categories/'), lastmod, changefreq: 'weekly', priority: 0.7 },
    ...categories.map(c => ({
      loc: resolveCanonicalUrl(`/categories/${c.slug}/`),
      lastmod,
      changefreq: 'weekly',
      priority: 0.6
    }))
  ];

  // 5. Hubs (English Only)
  const hubUrls: SitemapUrl[] = [
    { loc: resolveCanonicalUrl('/tools/'), lastmod, changefreq: 'weekly', priority: 0.7 },
    ...toolHubs.map(h => ({
      loc: resolveCanonicalUrl(`/tools/${h.slug}/`),
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
        loc: resolveCanonicalUrl(route),
        lastmod,
        changefreq: 'daily',
        priority: 0.7
      };
    });

  // 7. Images
  const indexableTools = tools.filter(t => !noindex.has(t.slug));
  const imageUrls: SitemapImageUrl[] = indexableTools.map(t => {
    const imgMeta = getImageMetadata(siteConfig.defaultOgImage, 'general');
    return {
      loc: resolveCanonicalUrl(`/tools/${t.slug}/`),
      imageLoc: imgMeta.url,
      imageTitle: imgMeta.title,
      imageCaption: imgMeta.caption
    };
  });

  return {
    pages,
    blog,
    tools: englishTools,
    categories: categoryUrls,
    hubs: hubUrls,
    locales: localeUrls,
    images: imageUrls
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
  fs.writeFileSync(path.join(publicDir, 'sitemap-images.xml'), compileImageSitemapXml(data.images));

  // Write Future-ready Video & News sitemaps (standard boilerplate namespaces)
  const videoSkeleton = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n</urlset>';
  const newsSkeleton = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n</urlset>';
  fs.writeFileSync(path.join(publicDir, 'sitemap-videos.xml'), videoSkeleton);
  fs.writeFileSync(path.join(publicDir, 'sitemap-news.xml'), newsSkeleton);

  // Write index sitemaps
  const sitemaps = [
    'sitemap-pages.xml',
    'sitemap-blog.xml',
    'sitemap-tools.xml',
    'sitemap-categories.xml',
    'sitemap-hubs.xml',
    'sitemap-locales.xml',
    'sitemap-images.xml',
    'sitemap-videos.xml',
    'sitemap-news.xml'
  ];

  const indexXml = compileSitemapIndexXml(sitemaps);
  fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), indexXml);
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexXml);
}
