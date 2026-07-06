import { generateEmbeddings } from '../knowledge/embeddings';
import { vectorIndex } from '../vector';

export interface LongTermMemoryRecord {
  key: string;
  value: string;
}

class LongTermMemory {
  /**
   * Upserts key value mappings along with embeddings references
   */
  async saveMemory(key: string, value: string) {
    const vector = await generateEmbeddings(value);
    vectorIndex.upsert([
      {
        id: `ltm-${key}`,
        vector,
        payload: { key, value }
      }
    ]);
  }
}

export const longTermMemory = new LongTermMemory();
