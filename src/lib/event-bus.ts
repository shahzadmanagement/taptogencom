export type EventPriority = 'high' | 'medium' | 'low';

export interface BusEvent<T = any> {
  name: string;
  payload: T;
  priority: EventPriority;
  timestamp: string;
  retryCount?: number;
}

export type Middleware = (event: BusEvent, next: () => void) => void;
export type Subscriber<T = any> = (event: BusEvent<T>) => void;

class EventBus {
  private subscribers: Record<string, Set<Subscriber>> = {};
  private onceSubscribers: Record<string, Set<Subscriber>> = {};
  private middlewares: Middleware[] = [];
  private eventQueue: BusEvent[] = [];
  private batchSize = 10;
  private flushInterval = 3000; // 3 seconds batch interval
  private flushTimer: any = null;

  constructor() {
    this.startBatchTimer();
  }

  use(middleware: Middleware): void {
    this.middlewares.push(middleware);
  }

  subscribe<T = any>(name: string, callback: Subscriber<T>): void {
    if (!this.subscribers[name]) {
      this.subscribers[name] = new Set();
    }
    this.subscribers[name].add(callback);
  }

  unsubscribe<T = any>(name: string, callback: Subscriber<T>): void {
    if (this.subscribers[name]) {
      this.subscribers[name].delete(callback);
    }
    if (this.onceSubscribers[name]) {
      this.onceSubscribers[name].delete(callback);
    }
  }

  once<T = any>(name: string, callback: Subscriber<T>): void {
    if (!this.onceSubscribers[name]) {
      this.onceSubscribers[name] = new Set();
    }
    this.onceSubscribers[name].add(callback);
  }

  publish<T = any>(name: string, payload: T, priority: EventPriority = 'medium'): void {
    const event: BusEvent<T> = {
      name,
      payload,
      priority,
      timestamp: new Date().toISOString(),
      retryCount: 0
    };

    this.runMiddlewares(event, () => {
      // Direct execute high-priority immediately
      if (priority === 'high') {
        this.dispatchImmediately(event);
      } else {
        // Batch low/medium priorities to preserve layout performance
        this.eventQueue.push(event);
        if (this.eventQueue.length >= this.batchSize) {
          this.flush();
        }
      }
    });
  }

  private runMiddlewares(event: BusEvent, done: () => void) {
    let index = 0;
    const next = () => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++];
        middleware(event, next);
      } else {
        done();
      }
    };
    next();
  }

  private dispatchImmediately(event: BusEvent): void {
    // Standard subscribers
    if (this.subscribers[event.name]) {
      this.subscribers[event.name].forEach(sub => {
        try { sub(event); } catch (e) { console.error('[EventBus Exception]:', e); }
      });
    }
    // Once subscribers
    if (this.onceSubscribers[event.name]) {
      this.onceSubscribers[event.name].forEach(sub => {
        try { sub(event); } catch (e) { console.error('[EventBus Exception]:', e); }
      });
      this.onceSubscribers[event.name].clear();
    }

    // Global listener catch-all for logs
    if (typeof window !== 'undefined' && (window as any).__ab_debug_log) {
      console.log(`[EventBus Publish]: "${event.name}" Payload:`, event.payload);
    }
  }

  flush(): void {
    if (this.eventQueue.length === 0) return;
    const batch = [...this.eventQueue];
    this.eventQueue = [];

    batch.forEach(event => {
      this.dispatchImmediately(event);
    });
  }

  private startBatchTimer(): void {
    if (typeof window === 'undefined') return;
    this.flushTimer = setInterval(() => this.flush(), this.flushInterval);
  }

  destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
  }
}

export const eventBus = new EventBus();
export default eventBus;
