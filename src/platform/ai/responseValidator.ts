import type { AIResponse } from './provider';

export function validateAIResponse(res: AIResponse): boolean {
  if (!res.text || typeof res.text !== 'string') return false;
  if (!res.usage || typeof res.usage.totalTokens !== 'number') return false;
  return true;
}
