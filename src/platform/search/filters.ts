import type { IndexDocument } from './indexer';

export interface SearchFilters {
  category?: string;
  tags?: string[];
}

/**
 * Filters documents list using criteria parameters
 * @param docs document registry list
 * @param filters filters criteria
 * @returns filtered document registry list
 */
export function filterDocuments(docs: IndexDocument[], filters: SearchFilters): IndexDocument[] {
  return docs.filter(doc => {
    if (filters.category && doc.category !== filters.category) {
      return false;
    }
    return true;
  });
}
