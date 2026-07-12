import { eventBus } from './event-bus';

export interface SessionData {
  sessionId: string;
  visitNumber: number;
  isReturning: boolean;
  entryPage: string;
  pagesViewed: string[];
  toolSequence: string[];
  startTime: number;
}

class ProductAnalytics {
  private session: SessionData | null = null;

  initSession(): void {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;

    // 1. Session ID setup
    let sessionId = sessionStorage.getItem('taptogen-session-id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('taptogen-session-id', sessionId);
    }

    // 2. Visit number setup
    let visitStr = localStorage.getItem('taptogen-visit-count');
    let visitNumber = visitStr ? parseInt(visitStr, 10) : 0;
    if (!sessionStorage.getItem('taptogen-session-initialized')) {
      visitNumber++;
      localStorage.setItem('taptogen-visit-count', visitNumber.toString());
      sessionStorage.setItem('taptogen-session-initialized', 'true');
    }

    const entryPage = sessionStorage.getItem('taptogen-entry-page') || window.location.pathname;
    sessionStorage.setItem('taptogen-entry-page', entryPage);

    // 3. Pages and sequence trackers
    const pagesViewed = JSON.parse(sessionStorage.getItem('taptogen-session-pages') || '[]');
    if (!pagesViewed.includes(window.location.pathname)) {
      pagesViewed.push(window.location.pathname);
      sessionStorage.setItem('taptogen-session-pages', JSON.stringify(pagesViewed));
    }

    const toolSequence = JSON.parse(sessionStorage.getItem('taptogen-session-sequence') || '[]');
    const currentTool = this.extractToolSlug(window.location.pathname);
    if (currentTool && toolSequence[toolSequence.length - 1] !== currentTool) {
      toolSequence.push(currentTool);
      sessionStorage.setItem('taptogen-session-sequence', JSON.stringify(toolSequence));
    }

    this.session = {
      sessionId,
      visitNumber,
      isReturning: visitNumber > 1,
      entryPage,
      pagesViewed,
      toolSequence,
      startTime: parseInt(sessionStorage.getItem('taptogen-session-start') || Date.now().toString(), 10)
    };

    if (!sessionStorage.getItem('taptogen-session-start')) {
      sessionStorage.setItem('taptogen-session-start', this.session.startTime.toString());
    }

    // Bind page view and unload trackers
    this.trackPageView();
    this.bindExitPageTracker();
  }

  private extractToolSlug(pathname: string): string | null {
    if (pathname.includes('/tools/')) {
      return pathname.split('/').pop() || null;
    }
    return null;
  }

  getSession(): SessionData | null {
    return this.session;
  }

  trackPageView(): void {
    if (typeof window === 'undefined') return;
    const payload = {
      path: window.location.pathname,
      referrer: document.referrer,
      session: this.session
    };
    eventBus.publish('page_view', payload, 'medium');
  }

  trackToolAction(action: 'open' | 'generate' | 'copy' | 'download' | 'share' | 'favorite', toolSlug: string, metadata?: any): void {
    const name = `tool_${action}`;
    const payload = {
      toolSlug,
      metadata,
      session: this.session,
      timestamp: new Date().toISOString()
    };
    eventBus.publish(name, payload, action === 'generate' || action === 'copy' ? 'high' : 'medium');
  }

  private bindExitPageTracker(): void {
    if (typeof window === 'undefined') return;
    window.addEventListener('beforeunload', () => {
      const duration = Math.round((Date.now() - (this.session?.startTime || Date.now())) / 1000);
      const payload = {
        exitPage: window.location.pathname,
        durationSeconds: duration,
        session: this.session
      };
      eventBus.publish('session_exit', payload, 'low');
      eventBus.flush(); // Flush queue synchronously on page unload
    });
  }
}

export const productAnalytics = new ProductAnalytics();
export default productAnalytics;
