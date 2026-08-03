import { siteConfig } from '../config/site';
import { tools } from '../data/tools';
import { categories } from '../data/categories';
import { noindexToolSlugs } from '../data/tool-page-data';

export interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
}

export interface SitemapData {
  tools: SitemapEntry[];
  categories: SitemapEntry[];
}

export interface ImageSitemapEntry {
  loc: string;
  imageLoc: string;
  imageTitle: string;
  imageCaption: string;
}

export function compileSitemapIndexXml(files: string[]): string {
  const baseUrl = siteConfig.url;
  const items = files.map(file => `  <sitemap>\n    <loc>${baseUrl}/${file}</loc>\n  </sitemap>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>`;
}

export function getSitemapData(): SitemapData {
  const baseUrl = siteConfig.url;
  const noindexSet = new Set(noindexToolSlugs);

  const indexableTools = tools
    .filter(t => !noindexSet.has(t.slug))
    .map(t => ({
      loc: `${baseUrl}/tools/${t.slug}/`,
      priority: 0.8
    }));

  const indexableCategories = categories.map(c => ({
    loc: `${baseUrl}/categories/${c.slug}/`,
    priority: 0.9
  }));

  return {
    tools: indexableTools,
    categories: indexableCategories
  };
}

export function compileImageSitemapXml(images: ImageSitemapEntry[]): string {
  const items = images.map(img => `  <url>\n    <loc>${img.loc}</loc>\n    <image:image>\n      <image:loc>${img.imageLoc}</image:loc>\n      <image:title>${img.imageTitle}</image:title>\n      <image:caption>${img.imageCaption}</image:caption>\n    </image:image>\n  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${items}\n</urlset>`;
}
