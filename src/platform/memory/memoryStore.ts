import { shortTermMemory } from './shortTermMemory';
import { longTermMemory } from './longTermMemory';

class MemoryStore {
  /**
   * Logs conversation details in both short-term buffer and long-term storage
   */
  async recordInteraction(role: 'user' | 'assistant', content: string) {
    shortTermMemory.addMessage(role, content);
    const key = `int-${Date.now()}`;
    await longTermMemory.saveMemory(key, content);
  }
}

export const memoryStore = new MemoryStore();
