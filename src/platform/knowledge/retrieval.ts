import { generateEmbeddings } from './embeddings';
import { vectorIndex } from '../vector';
import type { DocumentChunk } from './chunking';

export interface RetrievedChunk {
  chunk: DocumentChunk;
  similarity: number;
}

/**
 * Performs semantic matching query over vector storage index
 * @param query input search query
 * @param limit results limit count
 * @returns matching similarity ranked chunks list
 */
export async function retrieveChunks(query: string, limit = 3): Promise<RetrievedChunk[]> {
  const queryVector = await generateEmbeddings(query);
  const hits = vectorIndex.searchSimilarity(queryVector, limit);

  return hits.map(hit => {
    return {
      chunk: hit.payload as DocumentChunk,
      similarity: hit.similarity
    };
  });
}
