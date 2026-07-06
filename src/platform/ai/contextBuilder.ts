import type { RetrievedChunk } from '../knowledge/retrieval';

/**
 * Compiles retrieved vector chunks content into AI prompt context
 * @param chunks retrieved vector chunks
 * @returns compiled prompt context string
 */
export function buildPromptContext(chunks: RetrievedChunk[]): string {
  if (chunks.length === 0) return 'No context available.';
  
  return chunks
    .map((c, i) => `[Source ${i + 1}] (Score: ${c.similarity.toFixed(2)})\n${c.chunk.text}`)
    .join('\n\n');
}
