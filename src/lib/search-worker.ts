import { createSearchIndex } from './search-engine';
import type { SearchableDocument } from './search-types';

export class SearchWorkerManager {
  private index: SearchableDocument[] = [];
  private isRebuilding = false;

  constructor() {
    this.index = createSearchIndex();
  }

  // Schedules index rebuilding asynchronously during CPU idle cycles to prevent UI blocking
  rebuildIndexAsync(newDocs?: SearchableDocument[]): Promise<void> {
    return new Promise(resolve => {
      const schedule = typeof window !== 'undefined' && (window as any).requestIdleCallback
        ? (window as any).requestIdleCallback
        : (cb: any) => setTimeout(cb, 1);

      this.isRebuilding = true;

      schedule(() => {
        this.index = createSearchIndex(newDocs);
        this.isRebuilding = false;
        resolve();
      });
    });
  }

  // Incrementally appends new documents to the index
  addIncrementalDocs(docs: SearchableDocument[]): void {
    this.index = [...this.index, ...docs];
  }

  // Prefetch search matches for pre-warming caches
  prefetchQueries(queries: string[], searchResolver: (q: string) => any): void {
    const schedule = typeof window !== 'undefined' && (window as any).requestIdleCallback
      ? (window as any).requestIdleCallback
      : (cb: any) => setTimeout(cb, 5);

    schedule(() => {
      queries.forEach(q => {
        searchResolver(q);
      });
    });
  }

  getIndex(): SearchableDocument[] {
    return this.index;
  }

  isBusy(): boolean {
    return this.isRebuilding;
  }
}

export const searchWorker = new SearchWorkerManager();
export default searchWorker;
