export interface TokenRecord {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  timestamp: string;
}

class TokenUsageTracker {
  private records: TokenRecord[] = [];

  recordUsage(promptTokens: number, completionTokens: number) {
    this.records.push({
      promptTokens,
      completionTokens,
      totalTokens: promptTokens + completionTokens,
      timestamp: new Date().toISOString()
    });
  }

  getTotalTokensUsed(): number {
    return this.records.reduce((acc, r) => acc + r.totalTokens, 0);
  }
}

export const tokenUsageTracker = new TokenUsageTracker();
