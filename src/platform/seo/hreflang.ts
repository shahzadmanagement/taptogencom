import { getCanonicalUrl } from './canonical';

export interface HreflangAlternate {
  lang: string;
  href: string;
}

export function getHreflangsForTool(slug: string, locales: string[] = ['en', 'es', 'pt', 'fr', 'de', 'hi']): HreflangAlternate[] {
  const alternates: HreflangAlternate[] = [];
  locales.forEach(lang => {
    const prefix = lang === 'en' ? '' : `/${lang}`;
    alternates.push({
      lang,
      href: getCanonicalUrl(`${prefix}/tools/${slug}/`)
    });
  });
  // Add x-default
  alternates.push({
    lang: 'x-default',
    href: getCanonicalUrl(`/tools/${slug}/`)
  });
  return alternates;
}
