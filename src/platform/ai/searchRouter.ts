import { search } from '../search/search';
import { retrieveChunks } from '../knowledge/retrieval';

/**
 * Route request to inverted search query index or vector storage semantic search
 */
export async function routeSearchRequest(query: string, method: 'keyword' | 'semantic' = 'semantic') {
  if (method === 'keyword') {
    return {
      type: 'keyword',
      results: search(query)
    };
  } else {
    return {
      type: 'semantic',
      results: await retrieveChunks(query)
    };
  }
}
