import type { VectorProvider, VectorRecord, VectorSearchResult } from './provider';
import { cosineSimilarity } from './similarity';

export class MemoryVectorStore implements VectorProvider {
  name = 'memory';
  private database = new Map<string, VectorRecord>();

  upsert(records: VectorRecord[]) {
    records.forEach(r => this.database.set(r.id, r));
  }

  searchSimilarity(queryVector: number[], limit: number): VectorSearchResult[] {
    const list: VectorSearchResult[] = [];
    this.database.forEach(rec => {
      const sim = cosineSimilarity(queryVector, rec.vector);
      list.push({
        id: rec.id,
        similarity: sim,
        payload: rec.payload
      });
    });

    return list.sort((a, b) => b.similarity - a.similarity).slice(0, limit);
  }
}
