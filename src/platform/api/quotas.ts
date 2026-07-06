export interface QuotaLimit {
  maxRequests: number;
  windowMs: number;
}

export const quotaLimits = {
  standard: { maxRequests: 1000, windowMs: 86400000 },
  premium: { maxRequests: 50000, windowMs: 86400000 }
};
