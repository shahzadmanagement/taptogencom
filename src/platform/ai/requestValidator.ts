import type { AIRequest } from './provider';

export function validateAIRequest(req: AIRequest): boolean {
  if (!req.prompt || typeof req.prompt !== 'string') return false;
  if (req.prompt.length > 8000) return false;
  return true;
}
