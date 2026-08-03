export interface AiGenerationOptions {
  toolName: string;
  category: string;
  variables: Record<string, any>;
  provider?: string;
}

export class AiEngine {
  private defaultProvider: string;

  constructor(defaultProvider = 'gemini') {
    this.defaultProvider = defaultProvider;
  }

  async generate(options: AiGenerationOptions): Promise<string> {
    const provider = options.provider || this.defaultProvider;
    const pName = provider === 'openai' ? '[OpenAI]' : '[Gemini]';
    return `${pName} Generated response for ${options.toolName}`;
  }

  async *generateStream(options: AiGenerationOptions): AsyncIterable<string> {
    const provider = options.provider || this.defaultProvider;
    const pName = provider === 'openai' ? '[OpenAI]' : '[Gemini]';
    yield `${pName} Chunk 1 `;
    yield `Chunk 2 for ${options.toolName}`;
  }
}
