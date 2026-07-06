import type { AIResponse } from './provider';

const responseCache = new Map<string, AIResponse>();

export function getCachedResponse(prompt: string): AIResponse | undefined {
  return responseCache.get(prompt);
}

export function setCachedResponse(prompt: string, response: AIResponse) {
  responseCache.set(prompt, response);
}
