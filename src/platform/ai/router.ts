import type { AIProvider, AIRequest, AIResponse } from './provider';
import { GeminiProvider } from './providers/gemini';
import { OpenAIProvider } from './providers/openai';
import { AnthropicProvider } from './providers/anthropic';

class AIRouter {
  private providers: Record<string, AIProvider> = {
    gemini: new GeminiProvider(),
    openai: new OpenAIProvider(),
    anthropic: new AnthropicProvider()
  };

  async routeRequest(providerName: string, req: AIRequest): Promise<AIResponse> {
    const provider = this.providers[providerName] || this.providers.gemini;
    try {
      return await provider.generateText(req);
    } catch (e) {
      // Automatic failover fallback to Gemini
      return await this.providers.gemini.generateText(req);
    }
  }
}

export const aiRouter = new AIRouter();
