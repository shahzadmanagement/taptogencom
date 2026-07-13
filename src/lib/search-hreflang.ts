import { resolveCanonicalUrl } from './search-canonical';
import { getToolLanguageAlternates, localizedPilotTools } from '../data/localization';
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
      const entry = localizedPilotTools.find(
        (t) => t.language === lang && t.localizedSlug === slug
      );
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

  const canonicalUrl = resolveCanonicalUrl(pathname);
  return [
    { lang: 'en', href: canonicalUrl },
    { lang: 'x-default', href: canonicalUrl }
  ];
}
