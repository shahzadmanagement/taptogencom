const clientLimits = new Map<string, { count: number; resetTime: number }>();

export function checkAIRateLimit(clientId: string, limit = 10, windowMs = 60000): boolean {
  const now = Date.now();
  const state = clientLimits.get(clientId);

  if (!state) {
    clientLimits.set(clientId, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (now > state.resetTime) {
    state.count = 1;
    state.resetTime = now + windowMs;
    return true;
  }

  if (state.count >= limit) {
    return false;
  }

  state.count++;
  return true;
}
