const blockedKeywords = ['malware', 'hack', 'exploit', 'bypass security'];

export function checkPromptSafety(prompt: string): boolean {
  const normalized = prompt.toLowerCase();
  return !blockedKeywords.some(keyword => normalized.includes(keyword));
}
