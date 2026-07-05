import { getToolBySlug, getToolsByCategory, getPopularTools, type Tool } from '../data/tools';

export function getInternalLinks(slug: string, limit = 4) {
  const tool = getToolBySlug(slug);
  
  // 1. Resolve related pages from registry
  let related: Tool[] = [];
  if (tool) {
    related = tool.relatedSlugs
      .map(s => getToolBySlug(s))
      .filter((t): t is Tool => t !== undefined);
  }

  // 2. Sibling category fallback
  if (related.length < limit && tool) {
    const siblings = getToolsByCategory(tool.categorySlug)
      .filter(t => t.slug !== slug && !tool.relatedSlugs.includes(t.slug));
    related = [...related, ...siblings];
  }

  // 3. Global popular tools fallback
  if (related.length < limit) {
    const populars = getPopularTools().filter(t => t.slug !== slug && !related.some(r => r.slug === t.slug));
    related = [...related, ...populars];
  }

  return related.slice(0, limit);
}
