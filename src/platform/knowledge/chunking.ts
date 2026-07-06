export interface DocumentChunk {
  docId: string;
  chunkIndex: number;
  text: string;
}

/**
 * Splits document content into fixed token/character chunk sizes
 * @param docId original document ID
 * @param content text string content
 * @param chunkSize character length size
 * @param overlap overlap margin
 * @returns list of chunks
 */
export function chunkText(docId: string, content: string, chunkSize = 500, overlap = 100): DocumentChunk[] {
  const chunks: DocumentChunk[] = [];
  let index = 0;
  let start = 0;

  while (start < content.length) {
    const end = Math.min(start + chunkSize, content.length);
    const chunkTextStr = content.substring(start, end);
    chunks.push({
      docId,
      chunkIndex: index++,
      text: chunkTextStr
    });
    start += (chunkSize - overlap);
  }

  return chunks;
}
