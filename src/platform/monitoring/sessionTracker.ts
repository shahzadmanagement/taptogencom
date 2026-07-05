export interface SessionState {
  sessionId: string;
  startTime: number;
  lastActive: number;
  interactionsCount: number;
}

class SessionTracker {
  private session: SessionState | null = null;

  startSession() {
    if (typeof window === 'undefined') return;

    let sid = sessionStorage.getItem('taptogen_sid');
    if (!sid) {
      sid = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('taptogen_sid', sid);
    }

    this.session = {
      sessionId: sid,
      startTime: Date.now(),
      lastActive: Date.now(),
      interactionsCount: 0
    };

    window.addEventListener('click', () => this.trackInteraction());
    window.addEventListener('keydown', () => this.trackInteraction());
  }

  trackInteraction() {
    if (this.session) {
      this.session.interactionsCount++;
      this.session.lastActive = Date.now();
    }
  }

  getSession(): SessionState | null {
    return this.session;
  }
}

export const sessionTracker = new SessionTracker();
