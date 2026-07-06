import type { AIProvider, AIRequest, AIResponse } from '../provider';

export class AnthropicProvider implements AIProvider {
  name = 'anthropic';

  async generateText(req: AIRequest): Promise<AIResponse> {
    // Mock Anthropic API call
    return {
      text: `[Anthropic Response]: Output for "${req.prompt}"`,
      usage: {
        promptTokens: req.prompt.length / 4,
        completionTokens: 22,
        totalTokens: (req.prompt.length / 4) + 22
      },
      provider: this.name
    };
  }
}
