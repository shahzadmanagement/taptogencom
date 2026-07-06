export interface ShortTermMemoryRecord {
  role: 'user' | 'assistant';
  content: string;
}

class ShortTermMemory {
  private buffer: ShortTermMemoryRecord[] = [];

  addMessage(role: ShortTermMemoryRecord['role'], content: string) {
    this.buffer.push({ role, content });
    // Sliding context limit
    if (this.buffer.length > 20) {
      this.buffer.shift();
    }
  }

  getBuffer(): ShortTermMemoryRecord[] {
    return this.buffer;
  }

  clear() {
    this.buffer = [];
  }
}

export const shortTermMemory = new ShortTermMemory();
