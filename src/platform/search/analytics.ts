export interface SearchEvent {
  query: string;
  selectedId?: string;
  conversion: boolean;
  timestamp: string;
}

class SearchAnalytics {
  private events: SearchEvent[] = [];

  logSearchEvent(query: string, selectedId?: string, conversion = false) {
    this.events.push({
      query,
      selectedId,
      conversion,
      timestamp: new Date().toISOString()
    });
  }

  getConversionRate(): number {
    if (this.events.length === 0) return 0;
    const count = this.events.filter(e => e.conversion).length;
    return count / this.events.length;
  }
}

export const searchAnalytics = new SearchAnalytics();
