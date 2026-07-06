import { eventBus } from '../analytics/eventBus';

export interface ReplayEvent {
  type: 'click' | 'input' | 'resize';
  target?: string;
  x?: number;
  y?: number;
  value?: string;
  timestamp: number;
}

class SessionReplayTracker {
  private events: ReplayEvent[] = [];

  init() {
    if (typeof window === 'undefined') return;

    window.addEventListener('click', (e) => {
      this.record({
        type: 'click',
        target: (e.target as HTMLElement)?.tagName,
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      });
    });
  }

  record(event: ReplayEvent) {
    this.events.push(event);
    if (this.events.length >= 10) {
      this.flush();
    }
  }

  flush() {
    eventBus.publish('telemetry_replay_flush', {
      eventsCount: this.events.length,
      events: this.events
    });
    this.events = [];
  }
}

export const sessionReplay = new SessionReplayTracker();
