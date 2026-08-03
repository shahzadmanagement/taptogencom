import { resolveCanonicalUrl } from './search-canonical';
import { getToolLanguageAlternates, getLocalizedToolBySlug, supportedLanguages, type SupportedLanguageCode } from '../data/localization';
import { tools } from '../data/tools';
import { noindexToolSlugs } from '../data/tool-page-data';

export interface HreflangAlternate {
  lang: string;
  href: string;
}

export function getHreflangAlternates(pathname: string): HreflangAlternate[] {
  const normPath = pathname.replace(/\/+/g, '/').toLowerCase();
  const pathParts = normPath.split('/').filter(Boolean);

  const localOffset = (pathParts[0] && pathParts[0].length === 2 && pathParts[0] !== 'en') ? 1 : 0;
  const isLocalized = localOffset > 0;
  const lang = isLocalized ? pathParts[0] : 'en';

  const subParts = pathParts.slice(localOffset);
  const subPath = '/' + subParts.join('/');

  let isToolDetail = false;
  let toolSlug = '';

  if (subPath.startsWith('/tools/') && subPath !== '/tools/') {
    const slug = pathParts[pathParts.length - 1];
    const indexableToolsSlugs = new Set(tools.filter(t => !noindexToolSlugs.has(t.slug)).map(t => t.slug));
    
    if (isLocalized) {
      const entry = getLocalizedToolBySlug(slug, lang as SupportedLanguageCode);
      if (entry && indexableToolsSlugs.has(entry.canonicalToolId)) {
        isToolDetail = true;
        toolSlug = entry.canonicalToolId;
      }
    } else {
      if (indexableToolsSlugs.has(slug)) {
        isToolDetail = true;
        toolSlug = slug;
      }
    }
  }

  if (isToolDetail && toolSlug) {
    const alts = getToolLanguageAlternates(toolSlug);
    return alts.map(a => ({
      lang: a.lang,
      href: resolveCanonicalUrl(a.href)
    }));
  }

  // General pages (homepage, categories, tools index, blog, static pages)
  const isHome = subPath === '/' || subPath === '';
  const isToolsIndex = subPath === '/tools' || subPath === '/tools/';
  const isCategoriesIndex = subPath === '/categories' || subPath === '/categories/';
  const isBlogIndex = subPath === '/blog' || subPath === '/blog/';
  const isAbout = subPath.startsWith('/about-us');
  const isContact = subPath.startsWith('/contact-us');
  const isPrivacy = subPath.startsWith('/privacy');
  const isTerms = subPath.startsWith('/terms');
  const isDisclaimer = subPath.startsWith('/disclaimer');

  if (isHome || isToolsIndex || isCategoriesIndex || isBlogIndex || isAbout || isContact || isPrivacy || isTerms || isDisclaimer) {
    const rawSubPath = subPath.endsWith('/') ? subPath : subPath + '/';
    const cleanSubPath = rawSubPath === '//' ? '/' : rawSubPath;
    
    const alternates: HreflangAlternate[] = supportedLanguages
      .filter(l => l.enabled && l.indexable)
      .map(l => {
        const langPath = l.code === 'en' ? cleanSubPath : `/${l.code}${cleanSubPath}`;
        return {
          lang: l.code,
          href: resolveCanonicalUrl(langPath)
        };
      });

    const defaultHref = resolveCanonicalUrl(cleanSubPath);
    alternates.push({ lang: 'x-default', href: defaultHref });
    return alternates;
  }

  const canonicalUrl = resolveCanonicalUrl(pathname);
  return [
    { lang: 'en', href: canonicalUrl },
    { lang: 'x-default', href: canonicalUrl }
  ];
}
