/**
 * Generates float vector embeddings representation of text
 * @param text input query text
 * @param dimension vector space dimensions limit
 * @returns numeric array float embeddings representation
 */
export async function generateEmbeddings(text: string, dimension = 1536): Promise<number[]> {
  const result: number[] = new Array(dimension).fill(0);
  // Calculate deterministic values based on text char codes hash
  const lower = text.toLowerCase();
  for (let i = 0; i < lower.length; i++) {
    const code = lower.charCodeAt(i);
    result[i % dimension] += code;
  }

  // Normalize vector to unit length
  const sumSq = result.reduce((acc, val) => acc + (val * val), 0);
  const len = Math.sqrt(sumSq) || 1;
  return result.map(v => v / len);
}
