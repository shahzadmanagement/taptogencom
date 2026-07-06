import { generateEmbeddings } from '../knowledge/embeddings';
import { vectorIndex } from '../vector';

/**
 * Performs semantic similarity match retrieval over memory database records
 * @param query search query
 * @param limit results limit count
 * @returns similarity matching memory values list
 */
export async function searchMemories(query: string, limit = 3): Promise<string[]> {
  const queryVector = await generateEmbeddings(query);
  const hits = vectorIndex.searchSimilarity(queryVector, limit);
  return hits.map(hit => hit.payload.value as string);
}
