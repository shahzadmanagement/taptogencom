import { tools, type Tool } from '../data/tools';
import { categories } from '../data/categories';
import { toolHubs } from '../data/hubs';
import { noindexToolSlugs } from '../data/tool-page-data';
import { getToolRoute, getLocalizedToolByCanonicalId, localizedPilotTools, type SupportedLanguageCode } from '../data/localization';
import { resolveCanonicalUrl } from './search-canonical';

export interface InternalLink {
  url: string;
  anchor: string;
  icon: string;
}

export function getInternalLinks(pathname: string, lang: string = 'en'): InternalLink[] {
  const normPath = pathname.replace(/\/+/g, '/').toLowerCase();
  const pathParts = normPath.split('/').filter(Boolean);

  const localOffset = (pathParts[0] && pathParts[0].length === 2 && pathParts[0] !== 'en') ? 1 : 0;
  const isLocalized = localOffset > 0;
  const currentLang = isLocalized ? pathParts[0] : 'en';

  const subParts = pathParts.slice(localOffset);
  const subPath = '/' + subParts.join('/');

  let isHome = normPath === '/' || normPath === '' || normPath === `/${lang}` || normPath === `/${lang}/`;
  let isBlog = normPath.startsWith('/blog');
  let isCategoriesIndex = normPath === '/categories' || normPath === '/categories/';
  let isCategoryDetail = normPath.startsWith('/categories/') && !isCategoriesIndex;

  let isToolsIndex = subPath === '/tools' || subPath === '/tools/';
  let isHub = false;
  let isToolDetail = false;
  let currentSlug = '';

  if (subPath.startsWith('/tools/') && subPath !== '/tools/') {
    const slug = pathParts[pathParts.length - 1];
    const hubSlugs = new Set(toolHubs.map(h => h.slug));
    if (hubSlugs.has(slug)) {
      isHub = true;
      currentSlug = slug;
    } else {
      isToolDetail = true;
      currentSlug = slug;
    }
  }

  const links: InternalLink[] = [];
  const seenUrls = new Set<string>();

  function addLink(url: string, anchor: string, icon: string = '🔗') {
    const absoluteUrl = resolveCanonicalUrl(url);
    if (!seenUrls.has(absoluteUrl)) {
      seenUrls.add(absoluteUrl);
      links.push({ url: absoluteUrl, anchor, icon });
    }
  }

  const indexableTools = tools.filter(t => !noindexToolSlugs.has(t.slug));

  // 1. Tool Page Strategy
  if (isToolDetail && currentSlug) {
    let canonicalSlug = currentSlug;
    if (isLocalized) {
      const entry = localizedPilotTools.find(
        (t) => t.language === currentLang && t.localizedSlug === currentSlug
      );
      if (entry) {
        canonicalSlug = entry.canonicalToolId;
      }
    }

    const currentTool = tools.find(t => t.slug === canonicalSlug);
    if (currentTool) {
      const sameCategory = indexableTools
        .filter(t => t.categorySlug === currentTool.categorySlug && t.slug !== canonicalSlug);
      
      sameCategory.forEach(t => {
        const route = getToolRoute(t.slug, currentLang as SupportedLanguageCode);
        let anchor = t.name;
        if (currentLang !== 'en') {
          const loc = getLocalizedToolByCanonicalId(t.slug, currentLang as SupportedLanguageCode);
          if (loc && loc.primaryKeyword) {
            anchor = loc.primaryKeyword.charAt(0).toUpperCase() + loc.primaryKeyword.slice(1);
          }
        }
        addLink(route, anchor, t.icon);
      });

      const category = categories.find(c => c.slug === currentTool.categorySlug);
      if (category) {
        addLink(`/categories/${category.slug}/`, `${category.name} Category`, category.icon);
      }

      const hub = toolHubs.find(h => h.slug === currentTool.categorySlug);
      if (hub) {
        addLink(`/tools/${hub.slug}/`, `${hub.name} Hub`, hub.icon);
      }
    }
  }

  // 2. Category Detail Strategy
  else if (isCategoryDetail) {
    const categorySlug = pathParts[pathParts.length - 1];
    const category = categories.find(c => c.slug === categorySlug);
    if (category) {
      const children = indexableTools.filter(t => t.categorySlug === categorySlug);
      children.forEach(t => {
        addLink(`/tools/${t.slug}/`, t.name, t.icon);
      });

      const otherCategories = categories.filter(c => c.slug !== categorySlug);
      otherCategories.forEach(c => {
        addLink(`/categories/${c.slug}/`, c.name, c.icon);
      });

      const hub = toolHubs.find(h => h.slug === categorySlug);
      if (hub) {
        addLink(`/tools/${hub.slug}/`, `${hub.name} Hub`, hub.icon);
      }
    }
  }

  // 3. Hub Strategy
  else if (isHub && currentSlug) {
    const hub = toolHubs.find(h => h.slug === currentSlug);
    if (hub) {
      const catSlugs = hub.categorySlugs || [hub.slug];
      catSlugs.forEach(slug => {
        const category = categories.find(c => c.slug === slug);
        if (category) {
          addLink(`/categories/${category.slug}/`, category.name, category.icon);
        }
      });

      const hubTools = indexableTools.filter(t => catSlugs.includes(t.categorySlug));
      hubTools.forEach(t => {
        addLink(`/tools/${t.slug}/`, t.name, t.icon);
      });
    }
  }

  // 4. Blog Strategy
  else if (isBlog) {
    const popularTools = indexableTools.filter(t => t.popular);
    popularTools.forEach(t => {
      addLink(`/tools/${t.slug}/`, t.name, t.icon);
    });
    categories.slice(0, 3).forEach(c => {
      addLink(`/categories/${c.slug}/`, c.name, c.icon);
    });
  }

  // 5. Static Pages and Home Strategy
  else {
    const popularTools = indexableTools.filter(t => t.popular).slice(0, 5);
    popularTools.forEach(t => {
      addLink(`/tools/${t.slug}/`, t.name, t.icon);
    });
    categories.slice(0, 3).forEach(c => {
      addLink(`/categories/${c.slug}/`, c.name, c.icon);
    });
  }

  if (links.length < 5) {
    const popularTools = indexableTools.filter(t => t.popular);
    for (const t of popularTools) {
      if (links.length >= 8) break;
      const route = getToolRoute(t.slug, currentLang as SupportedLanguageCode);
      let anchor = t.name;
      if (currentLang !== 'en') {
        const loc = getLocalizedToolByCanonicalId(t.slug, currentLang as SupportedLanguageCode);
        if (loc && loc.primaryKeyword) {
          anchor = loc.primaryKeyword.charAt(0).toUpperCase() + loc.primaryKeyword.slice(1);
        }
      }
      addLink(route, anchor, t.icon);
    }
  }

  const selfCanonical = resolveCanonicalUrl(pathname);
  return links.filter(l => l.url !== selfCanonical).slice(0, 8);
}
