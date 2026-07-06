import type { RankedResult } from './ranking';

class SearchCache {
  private cache = new Map<string, RankedResult[]>();

  get(key: string): RankedResult[] | undefined {
    return this.cache.get(key);
  }

  set(key: string, value: RankedResult[]) {
    this.cache.set(key, value);
  }

  clear() {
    this.cache.clear();
  }
}

export const searchCache = new SearchCache();
