export interface AIRequest {
  prompt: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  text: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  provider: string;
}

export interface AIProvider {
  name: string;
  generateText(req: AIRequest): Promise<AIResponse>;
}
