import { resolveCanonicalUrl } from './search-canonical';
import { toolHubs } from '../data/hubs';
import { categories } from '../data/categories';

export interface BreadcrumbItem {
  name: string;
  url: string;
  isActive: boolean;
}

export function getBreadcrumbs(pathname: string, lang = 'en', title = ''): BreadcrumbItem[] {
  const normPath = pathname.replace(/\/+/g, '/').toLowerCase();
  const pathParts = normPath.split('/').filter(Boolean);

  const isSpanish = lang === 'es';
  const localOffset = (pathParts[0] && pathParts[0].length === 2 && pathParts[0] !== 'en') ? 1 : 0;
  const isLocalized = localOffset > 0;

  const homeUrl = resolveCanonicalUrl(isLocalized ? `/${lang}/` : '/');
  const items: BreadcrumbItem[] = [
    { name: isSpanish ? 'Inicio' : 'Home', url: homeUrl, isActive: normPath === '/' || normPath === `/${lang}` || normPath === `/${lang}/` }
  ];

  const subParts = pathParts.slice(localOffset);
  const subPath = '/' + subParts.join('/');

  let isBlog = normPath.startsWith('/blog');
  let isAbout = normPath.startsWith('/about-us');
  let isContact = normPath.startsWith('/contact-us');
  let isPrivacy = normPath.startsWith('/privacy');
  let isTerms = normPath.startsWith('/terms');
  let isDisclaimer = normPath.startsWith('/disclaimer');
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

  if (isBlog) {
    items.push({ name: 'Blog', url: resolveCanonicalUrl('/blog/'), isActive: true });
  } else if (isAbout) {
    items.push({ name: isSpanish ? 'Acerca de' : 'About Us', url: resolveCanonicalUrl('/about-us/'), isActive: true });
  } else if (isContact) {
    items.push({ name: isSpanish ? 'Contacto' : 'Contact Us', url: resolveCanonicalUrl('/contact-us/'), isActive: true });
  } else if (isPrivacy) {
    items.push({ name: isSpanish ? 'Privacidad' : 'Privacy Policy', url: resolveCanonicalUrl('/privacy/'), isActive: true });
  } else if (isTerms) {
    items.push({ name: isSpanish ? 'Términos' : 'Terms of Service', url: resolveCanonicalUrl('/terms/'), isActive: true });
  } else if (isDisclaimer) {
    items.push({ name: isSpanish ? 'Aviso legal' : 'Disclaimer', url: resolveCanonicalUrl('/disclaimer/'), isActive: true });
  } else if (isCategoriesIndex) {
    items.push({ name: isSpanish ? 'Categorías' : 'Categories', url: resolveCanonicalUrl('/categories/'), isActive: true });
  } else if (isCategoryDetail) {
    items.push({ name: isSpanish ? 'Categorías' : 'Categories', url: resolveCanonicalUrl('/categories/'), isActive: false });
    const categorySlug = pathParts[pathParts.length - 1];
    const category = categories.find(c => c.slug === categorySlug);
    items.push({ name: category ? category.name : categorySlug, url: resolveCanonicalUrl(normPath), isActive: true });
  } else if (isToolsIndex) {
    items.push({ name: isSpanish ? 'Herramientas' : 'Tools', url: resolveCanonicalUrl('/tools/'), isActive: true });
  } else if (isHub) {
    items.push({ name: isSpanish ? 'Herramientas' : 'Tools', url: resolveCanonicalUrl('/tools/'), isActive: false });
    const hubSlug = pathParts[pathParts.length - 1];
    const hub = toolHubs.find(h => h.slug === hubSlug);
    items.push({ name: hub ? hub.h1 : hubSlug, url: resolveCanonicalUrl(normPath), isActive: true });
  } else if (isToolDetail) {
    const toolsText = isSpanish ? 'Herramientas' : 'Tools';
    const toolsUrl = resolveCanonicalUrl(isLocalized ? `/${lang}/tools/` : '/tools/');
    items.push({ name: toolsText, url: toolsUrl, isActive: false });
    items.push({ name: title || pathParts[pathParts.length - 1], url: resolveCanonicalUrl(normPath), isActive: true });
  }

  return items;
}
