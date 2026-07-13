import { siteConfig } from '../config/site';
import { toolHubs } from '../data/hubs';
import { resolveCanonicalUrl } from './search-canonical';
import { getBreadcrumbs } from './search-breadcrumb';

export interface SchemaOptions {
  pathname: string;
  lang?: string;
  title: string;
  description: string;
  faqItems?: { q: string; a: string }[];
  howToSteps?: string[];
  imageUrl?: string;
  customSchemas?: object[];
}

function cleanHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/[\r\n\t]+/g, ' ') // Strip tabs/newlines
    .replace(/\s+/g, ' ') // Collapse whitespace
    .trim();
}

export function buildSchemas(options: SchemaOptions): object[] {
  const { pathname, lang = 'en', title, description, faqItems = [], howToSteps = [], imageUrl, customSchemas = [] } = options;
  const canonicalUrl = resolveCanonicalUrl(pathname);
  const cleanDescription = cleanHtml(description);
  const cleanTitle = cleanHtml(title);

  // Common objects
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/favicon.svg`,
      width: '112',
      height: '112'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.contactEmail,
      contactType: 'customer support'
    }
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: cleanHtml(siteConfig.description),
    publisher: { '@id': `${siteConfig.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/tools/?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  // Determine Page Type
  const normPath = pathname.replace(/\/+/g, '/').toLowerCase();
  const pathParts = normPath.split('/').filter(Boolean);

  let isHome = normPath === '/' || normPath === '';
  let isBlog = normPath.startsWith('/blog');
  let isAbout = normPath.startsWith('/about-us');
  let isContact = normPath.startsWith('/contact-us');
  let isPrivacy = normPath.startsWith('/privacy');
  let isTerms = normPath.startsWith('/terms');
  let isDisclaimer = normPath.startsWith('/disclaimer');
  let isCategoriesIndex = normPath === '/categories' || normPath === '/categories/';
  let isCategoryDetail = normPath.startsWith('/categories/') && !isCategoriesIndex;
  
  // Check localized segments
  const possibleLang = pathParts[0];
  const isLocalized = possibleLang && possibleLang.length === 2 && possibleLang !== 'en';
  const localOffset = isLocalized ? 1 : 0;

  const subPath = '/' + pathParts.slice(localOffset).join('/');
  
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

  const schemas: object[] = [];

  // Defer general site configuration schemas on homepage
  if (isHome) {
    schemas.push(websiteSchema);
    schemas.push(organizationSchema);
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: cleanTitle,
      description: cleanDescription,
      inLanguage: lang,
      isPartOf: { '@id': `${siteConfig.url}/#website` }
    });
  } else {
    // General webpage schema for interior routes
    schemas.push({
      '@context': 'https://schema.org',
      '@type': isAbout ? 'AboutPage' : isContact ? 'ContactPage' : 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: cleanTitle,
      description: cleanDescription,
      inLanguage: lang,
      isPartOf: { '@id': `${siteConfig.url}/#website` }
    });
  }

  // WebSiteNavigationElement
  const navigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSiteNavigationElement',
    '@id': `${canonicalUrl}#navigation`,
    name: ['Home', 'Tools', 'Categories', 'Blog'],
    url: [
      `${siteConfig.url}/`,
      `${siteConfig.url}/tools/`,
      `${siteConfig.url}/categories/`,
      `${siteConfig.url}/blog/`
    ]
  };
  schemas.push(navigationSchema);

  // BreadcrumbList
  const breadcrumbs = getBreadcrumbs(pathname, lang, cleanTitle);
  if (breadcrumbs.length > 1) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: item.url
      }))
    });
  }

  // WebApplication (for dynamic tool pages)
  if (isToolDetail) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      '@id': `${canonicalUrl}#webapp`,
      name: cleanTitle,
      url: canonicalUrl,
      description: cleanDescription,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      browserRequirements: 'Requires JavaScript',
      inLanguage: lang
    });
  }

  // CollectionPage & ItemList (Categories / Hubs)
  if (isCategoryDetail || isHub || isCategoriesIndex || isToolsIndex) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${canonicalUrl}#collection`,
      url: canonicalUrl,
      name: cleanTitle,
      description: cleanDescription,
      inLanguage: lang
    });

    // ItemList container for navigation list paths
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${canonicalUrl}#itemlist`,
      name: cleanTitle,
      url: canonicalUrl,
      numberOfItems: 4
    });
  }

  // HowTo (if steps are provided)
  if (howToSteps.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      '@id': `${canonicalUrl}#howto`,
      name: `How to use ${cleanTitle}`,
      description: cleanDescription,
      step: howToSteps.map((stepText, idx) => ({
        '@type': 'HowToStep',
        position: idx + 1,
        text: cleanHtml(stepText)
      }))
    });
  }

  // ImageObject (if imageUrl is resolved)
  if (imageUrl) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      '@id': `${canonicalUrl}#image`,
      url: imageUrl,
      caption: cleanTitle
    });
  }

  // BlogPosting / Article (for blog details)
  if (isBlog && pathParts.length > (isLocalized ? 2 : 1)) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${canonicalUrl}#blogposting`,
      headline: cleanTitle,
      description: cleanDescription,
      url: canonicalUrl,
      inLanguage: lang,
      publisher: { '@id': `${siteConfig.url}/#organization` },
      author: {
        '@type': 'Person',
        name: 'TapToGen Editorial Team'
      }
    });
  }

  // FAQPage (if items are present)
  if (faqItems.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: lang,
      mainEntity: faqItems.map(item => ({
        '@type': 'Question',
        name: cleanHtml(item.q),
        acceptedAnswer: {
          '@type': 'Answer',
          text: cleanHtml(item.a)
        }
      }))
    });
  }

  // Defer extension points hooks (VideoObject, Review, AggregateRating)
  // These hooks can be injected using options.customSchemas
  schemas.push(...customSchemas);

  return schemas;
}
