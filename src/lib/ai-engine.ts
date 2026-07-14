import { globalAiCache } from './ai-cache';
import { compilePrompt } from './prompt-engine';
import { validateAiOutput } from './output-validator';

export type AiProvider = 'gemini' | 'openai' | 'claude';

export interface AiRequestOptions {
  provider?: AiProvider;
  toolName: string;
  category: string;
  variables: Record<string, string>;
  format?: 'text' | 'json';
  timeoutMs?: number;
  maxRetries?: number;
}

export class AiEngine {
  private currentProvider: AiProvider;

  constructor(defaultProvider: AiProvider = 'gemini') {
    this.currentProvider = defaultProvider;
  }

  setProvider(provider: AiProvider): void {
    this.currentProvider = provider;
  }

  async generate(options: AiRequestOptions): Promise<string> {
    const provider = options.provider || this.currentProvider;
    const prompt = compilePrompt(options.toolName, options.category, options.variables);
    
    // Check Cache
    const cacheKey = `${provider}:${prompt}`;
    const cached = globalAiCache.get(cacheKey);
    if (cached) return cached;

    const timeout = options.timeoutMs || 8000;
    const maxRetries = options.maxRetries !== undefined ? options.maxRetries : 2;

    let attempt = 0;
    while (attempt <= maxRetries) {
      try {
        const response = await this.executeCallWithTimeout(provider, prompt, timeout);
        const validation = validateAiOutput(response, options.format);
        
        if (validation.isValid) {
          globalAiCache.set(cacheKey, validation.sanitized);
          return validation.sanitized;
        } else {
          throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
        }
      } catch (err: any) {
        attempt++;
        if (attempt > maxRetries) {
          throw new Error(`AI generation failed after ${attempt} attempts. Last error: ${err.message}`);
        }
      }
    }

    throw new Error('AI generation reached unreachable loop end');
  }

  // Simulate streaming response
  async *generateStream(options: AiRequestOptions): AsyncGenerator<string, void, unknown> {
    const response = await this.generate(options);
    const words = response.split(' ');
    for (const word of words) {
      yield word + ' ';
      await new Promise(resolve => setTimeout(resolve, 30));
    }
  }

  private async executeCallWithTimeout(provider: AiProvider, prompt: string, timeoutMs: number): Promise<string> {
    const callPromise = this.mockCall(provider, prompt);
    const timeoutPromise = new Promise<string>((_, reject) =>
      setTimeout(() => reject(new Error('AI request timed out')), timeoutMs)
    );

    return Promise.race([callPromise, timeoutPromise]);
  }

  private async mockCall(provider: AiProvider, prompt: string): Promise<string> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // Simple routing based on provider configuration
    if (provider === 'gemini') {
      return `[Gemini] Generated output for: ${prompt}`;
    } else if (provider === 'openai') {
      return `[OpenAI] Generated output for: ${prompt}`;
    } else {
      return `[Claude] Generated output for: ${prompt}`;
    }
  }
}

export const globalAiEngine = new AiEngine();
