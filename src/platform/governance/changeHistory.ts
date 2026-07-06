export interface ChangeRecord {
  id: string;
  field: string;
  before: string;
  after: string;
  timestamp: string;
}

class ChangeHistory {
  private history: ChangeRecord[] = [];

  recordChange(field: string, before: string, after: string) {
    this.history.push({
      id: Math.random().toString(36).substring(2, 9),
      field,
      before,
      after,
      timestamp: new Date().toISOString()
    });
  }

  getHistory(): ChangeRecord[] {
    return this.history;
  }
}

export const changeHistory = new ChangeHistory();
