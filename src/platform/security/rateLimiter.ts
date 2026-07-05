const clients = new Map<string, { requests: number; resetTime: number }>();

export interface RateLimitStatus {
  allowed: boolean;
  requestsRemaining: number;
}

export function checkRateLimit(ip: string, limit = 60, windowMs = 60000): RateLimitStatus {
  const now = Date.now();
  const client = clients.get(ip);

  if (!client) {
    clients.set(ip, {
      requests: 1,
      resetTime: now + windowMs
    });
    return { allowed: true, requestsRemaining: limit - 1 };
  }

  if (now > client.resetTime) {
    client.requests = 1;
    client.resetTime = now + windowMs;
    return { allowed: true, requestsRemaining: limit - 1 };
  }

  if (client.requests >= limit) {
    return { allowed: false, requestsRemaining: 0 };
  }

  client.requests++;
  return { allowed: true, requestsRemaining: limit - client.requests };
}
