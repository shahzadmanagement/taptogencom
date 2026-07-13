import { siteConfig } from '../config/site';
import { toolHubs } from '../data/hubs';
import { categories } from '../data/categories';
import { resolveCanonicalUrl } from './search-canonical';

export interface SchemaOptions {
  pathname: string;
  lang?: string;
  title: string;
  description: string;
  faqItems?: { q: string; a: string }[];
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
  const { pathname, lang = 'en', title, description, faqItems = [], customSchemas = [] } = options;
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

  // 1. Homepage & General WebPage
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
  } else if (isAbout) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: cleanTitle,
      description: cleanDescription,
      inLanguage: lang,
      isPartOf: { '@id': `${siteConfig.url}/#website` }
    });
  } else if (isContact) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: cleanTitle,
      description: cleanDescription,
      inLanguage: lang,
      isPartOf: { '@id': `${siteConfig.url}/#website` }
    });
  } else if (isPrivacy || isTerms || isDisclaimer) {
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
  }

  // 2. BreadcrumbList
  const breadcrumbItems: { name: string; item: string }[] = [
    { name: lang === 'es' ? 'Inicio' : 'Home', item: resolveCanonicalUrl(isLocalized ? `/${lang}/` : '/') }
  ];

  if (isBlog) {
    breadcrumbItems.push({ name: 'Blog', item: resolveCanonicalUrl('/blog/') });
  } else if (isAbout) {
    breadcrumbItems.push({ name: lang === 'es' ? 'Acerca de' : 'About Us', item: resolveCanonicalUrl('/about-us/') });
  } else if (isContact) {
    breadcrumbItems.push({ name: lang === 'es' ? 'Contacto' : 'Contact Us', item: resolveCanonicalUrl('/contact-us/') });
  } else if (isPrivacy) {
    breadcrumbItems.push({ name: lang === 'es' ? 'Privacidad' : 'Privacy Policy', item: resolveCanonicalUrl('/privacy/') });
  } else if (isTerms) {
    breadcrumbItems.push({ name: lang === 'es' ? 'Términos' : 'Terms of Service', item: resolveCanonicalUrl('/terms/') });
  } else if (isDisclaimer) {
    breadcrumbItems.push({ name: lang === 'es' ? 'Aviso legal' : 'Disclaimer', item: resolveCanonicalUrl('/disclaimer/') });
  } else if (isCategoriesIndex) {
    breadcrumbItems.push({ name: lang === 'es' ? 'Categorías' : 'Categories', item: resolveCanonicalUrl('/categories/') });
  } else if (isCategoryDetail) {
    breadcrumbItems.push({ name: lang === 'es' ? 'Categorías' : 'Categories', item: resolveCanonicalUrl('/categories/') });
    const categorySlug = pathParts[pathParts.length - 1];
    const category = categories.find(c => c.slug === categorySlug);
    breadcrumbItems.push({ name: category ? category.name : categorySlug, item: canonicalUrl });
  } else if (isToolsIndex) {
    breadcrumbItems.push({ name: lang === 'es' ? 'Herramientas' : 'Tools', item: resolveCanonicalUrl('/tools/') });
  } else if (isHub) {
    breadcrumbItems.push({ name: lang === 'es' ? 'Herramientas' : 'Tools', item: resolveCanonicalUrl('/tools/') });
    const hubSlug = pathParts[pathParts.length - 1];
    const hub = toolHubs.find(h => h.slug === hubSlug);
    breadcrumbItems.push({ name: hub ? hub.h1 : hubSlug, item: canonicalUrl });
  } else if (isToolDetail) {
    const toolsText = lang === 'es' ? 'Herramientas' : 'Tools';
    breadcrumbItems.push({ name: toolsText, item: resolveCanonicalUrl(isLocalized ? `/${lang}/tools/` : '/tools/') });
    breadcrumbItems.push({ name: cleanTitle, item: canonicalUrl });
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.item
    }))
  };
  
  if (breadcrumbItems.length > 1) {
    schemas.push(breadcrumbSchema);
  }

  // 3. WebApplication (for dynamic tool pages)
  if (isToolDetail) {
    const webAppSchema = {
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
    };
    schemas.push(webAppSchema);
  }

  // 4. CollectionPage (Categories / Hubs)
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
  }

  // 5. FAQPage (if items are present)
  if (faqItems.length > 0) {
    const faqSchema = {
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
    };
    schemas.push(faqSchema);
  }

  // Append any extra schemas
  schemas.push(...customSchemas);

  return schemas;
}
