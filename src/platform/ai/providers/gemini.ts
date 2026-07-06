import type { AIProvider, AIRequest, AIResponse } from '../provider';

export class GeminiProvider implements AIProvider {
  name = 'gemini';

  async generateText(req: AIRequest): Promise<AIResponse> {
    // Mock Gemini API call
    return {
      text: `[Gemini Response]: Output for "${req.prompt}"`,
      usage: {
        promptTokens: req.prompt.length / 4,
        completionTokens: 18,
        totalTokens: (req.prompt.length / 4) + 18
      },
      provider: this.name
    };
  }
}
