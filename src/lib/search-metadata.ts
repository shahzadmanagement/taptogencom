import { siteConfig } from '../config/site';
import { tools } from '../data/tools';
import { categories } from '../data/categories';
import { toolHubs } from '../data/hubs';
import { noindexToolSlugs } from '../data/tool-page-data';
import { localizedPilotTools } from '../data/localization';
import { resolveCanonicalUrl } from './search-canonical';

export interface MetadataOptions {
  pathname: string;
  lang?: string;
  titleOverride?: string;
  descriptionOverride?: string;
  noindexOverride?: boolean;
}

export interface PageMetadata {
  title: string;
  description: string;
  robots: string;
  author: string;
  applicationName: string;
  generator: string;
  creator: string;
  publisher: string;
  canonical: string;
}

function cleanHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function optimizeDescription(desc: string): string {
  if (!desc) {
    return cleanHtml(siteConfig.description).slice(0, 155);
  }
  let clean = cleanHtml(desc);
  
  if (clean.length > 160) {
    clean = clean.slice(0, 157);
    const lastSpace = clean.lastIndexOf(' ');
    clean = (lastSpace > 120 ? clean.slice(0, lastSpace) : clean) + '...';
  } else if (clean.length < 130) {
    const filler = ' — Free, instant, and secure browser-based generator tools. Generate names, text styles, social tags, and developer utilities instantly on TapToGen.';
    clean = (clean + filler).slice(0, 155);
  }
  return clean;
}

export function buildMetadata(options: MetadataOptions): PageMetadata {
  const { pathname, lang = 'en', titleOverride, descriptionOverride, noindexOverride = false } = options;
  const canonicalUrl = resolveCanonicalUrl(pathname);

  const normPath = pathname.replace(/\/+/g, '/').toLowerCase();
  const pathParts = normPath.split('/').filter(Boolean);

  const localOffset = (pathParts[0] && pathParts[0].length === 2 && pathParts[0] !== 'en') ? 1 : 0;
  const isLocalized = localOffset > 0;

  const subParts = pathParts.slice(localOffset);
  const subPath = '/' + subParts.join('/');

  let isHome = normPath === '/' || normPath === '' || normPath === `/${lang}` || normPath === `/${lang}/`;
  let isBlog = normPath.startsWith('/blog');
  let isAbout = normPath.startsWith('/about-us');
  let isContact = normPath.startsWith('/contact-us');
  let isPrivacy = normPath.startsWith('/privacy');
  let isTerms = normPath.startsWith('/terms');
  let isDisclaimer = normPath.startsWith('/disclaimer');
  let isSitemap = normPath.startsWith('/sitemap');
  let isCategoriesIndex = normPath === '/categories' || normPath === '/categories/';
  let isCategoryDetail = normPath.startsWith('/categories/') && !isCategoriesIndex;

  let isToolsIndex = subPath === '/tools' || subPath === '/tools/';
  let isHub = false;
  let isToolDetail = false;

  if (subPath.startsWith('/tools/') && subPath !== '/tools/') {
    const slug = pathParts[pathParts.length - 1];
    const hubSlugs = new Set(toolHubs.map(h => h.slug));
    if (hubSlugs.has(slug)) {
      isHub = true;
    } else {
      isToolDetail = true;
    }
  }

  // 1. Resolve raw title & description
  let title = '';
  let description = '';
  let noindex = noindexOverride;

  if (isHome) {
    title = lang === 'es' ? 'Generadores online gratis y sencillos' : 'Free online generator tools for naming, formatting and writing';
    description = siteConfig.description;
  } else if (isBlog) {
    title = 'TapToGen Blog — Latest Articles & Product Updates';
    description = 'Read the latest updates, design notes, coding guidelines, and features from the TapToGen team.';
  } else if (isAbout) {
    title = 'About Us — TapToGen Creator Platform';
    description = 'Learn more about the mission, engineering values, and developers behind the TapToGen browser utility tools.';
  } else if (isContact) {
    title = 'Contact Us — TapToGen Support';
    description = 'Get in touch with the team. Submit feedback, feature requests, bugs, and other utilities suggestions.';
  } else if (isPrivacy) {
    title = 'Privacy Policy — TapToGen Privacy Guidelines';
    description = 'Read our privacy guidelines. Find details on browser execution privacy, security profiles, and analytics tracking.';
  } else if (isTerms) {
    title = 'Terms of Service — TapToGen Terms & Conditions';
    description = 'Read our terms of service. Understand usage guidelines, license agreements, and disclaimer terms.';
  } else if (isDisclaimer) {
    title = 'Disclaimer — TapToGen Legal Terms';
    description = 'Read our disclaimer list. Factual claims validations, security guidelines, and third party links disclosures.';
  } else if (isSitemap) {
    title = 'Sitemap Directory — TapToGen Pages Index';
    description = 'Browse all dynamic generator tools, category listings, category hubs, and localized pages in the sitemap index.';
  } else if (isCategoriesIndex) {
    title = 'Categories Index — Browse All Generators by Topic';
    description = 'Browse all naming, text styles, social media tags, SEO, business, creative, and developer categories on TapToGen.';
  } else if (isCategoryDetail) {
    const categorySlug = pathParts[pathParts.length - 1];
    const category = categories.find(c => c.slug === categorySlug);
    title = category ? category.metaTitle : `${categorySlug} Tools List`;
    description = category ? category.metaDescription : `Find all free ${categorySlug} browser utility tools in this category.`;
  } else if (isToolsIndex) {
    title = 'Tools Directory — Search Browser Tools';
    description = 'Browse all tools. Search names, bio drafts, caption formats, meta tag generator, and developer tools.';
  } else if (isHub) {
    const hubSlug = pathParts[pathParts.length - 1];
    const hub = toolHubs.find(h => h.slug === hubSlug);
    title = hub ? hub.h1 : `${hubSlug} Hub`;
    description = hub ? hub.description : `Explore the main hubs for ${hubSlug} browser tools on TapToGen.`;
  } else if (isToolDetail) {
    const slug = pathParts[pathParts.length - 1];
    if (isLocalized) {
      const entry = localizedPilotTools.find(
        (t) => t.language === lang && t.localizedSlug === slug
      );
      if (entry) {
        title = entry.metaTitle;
        description = entry.metaDescription;
        noindex = noindex || noindexToolSlugs.has(entry.canonicalToolId);
      }
    } else {
      const tool = tools.find(t => t.slug === slug);
      if (tool) {
        title = tool.metaTitle || `${tool.name} Generator`;
        description = tool.metaDescription || tool.description;
        noindex = noindex || noindexToolSlugs.has(tool.slug);
      }
    }
  }

  // 2. Fallbacks & overrides
  if (titleOverride) title = titleOverride;
  if (descriptionOverride) description = descriptionOverride;

  title = cleanHtml(title) || 'Free Online Browser Generator Tools';
  description = optimizeDescription(description);

  // Brand suffix if needed (excluding Home page for length constraints)
  if (!isHome && !title.includes('TapToGen')) {
    title = `${title} — TapToGen`;
  }

  const robots = noindex 
    ? 'noindex, follow' 
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  return {
    title,
    description,
    robots,
    author: siteConfig.name,
    applicationName: siteConfig.name,
    generator: 'Astro',
    creator: siteConfig.name,
    publisher: siteConfig.name,
    canonical: canonicalUrl
  };
}
