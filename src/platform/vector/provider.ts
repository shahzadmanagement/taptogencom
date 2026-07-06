export interface VectorRecord {
  id: string;
  vector: number[];
  payload: any;
}

export interface VectorSearchResult {
  id: string;
  similarity: number;
  payload: any;
}

export interface VectorProvider {
  name: string;
  upsert(records: VectorRecord[]): void;
  searchSimilarity(queryVector: number[], limit: number): VectorSearchResult[];
}
