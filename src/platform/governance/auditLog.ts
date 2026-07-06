export interface AuditEvent {
  actor: string;
  scope: string;
  outcome: 'ALLOWED' | 'DENIED';
  timestamp: string;
}

class AuditLog {
  private events: AuditEvent[] = [];

  logEvent(actor: string, scope: string, outcome: 'ALLOWED' | 'DENIED') {
    this.events.push({ actor, scope, outcome, timestamp: new Date().toISOString() });
  }

  getEvents(): AuditEvent[] {
    return this.events;
  }
}

export const auditLog = new AuditLog();
