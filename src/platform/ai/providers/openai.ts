import type { AIProvider, AIRequest, AIResponse } from '../provider';

export class OpenAIProvider implements AIProvider {
  name = 'openai';

  async generateText(req: AIRequest): Promise<AIResponse> {
    // Mock OpenAI API call
    return {
      text: `[OpenAI Response]: Output for "${req.prompt}"`,
      usage: {
        promptTokens: req.prompt.length / 4,
        completionTokens: 20,
        totalTokens: (req.prompt.length / 4) + 20
      },
      provider: this.name
    };
  }
}
