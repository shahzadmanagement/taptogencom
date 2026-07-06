export interface ContextMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

class ContextManager {
  private messages: ContextMessage[] = [];

  addMessage(role: ContextMessage['role'], content: string) {
    this.messages.push({ role, content });
  }

  getContext(): ContextMessage[] {
    return this.messages;
  }

  clear() {
    this.messages = [];
  }
}

export const contextManager = new ContextManager();
