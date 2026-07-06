export type AnalyticsEvent = {
  name: string;
  payload: Record<string, any>;
  timestamp: number;
};

type EventListener = (event: AnalyticsEvent) => void;

class EventBus {
  private listeners: Set<EventListener> = new Set();

  subscribe(listener: EventListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  publish(name: string, payload: Record<string, any> = {}) {
    const event: AnalyticsEvent = {
      name,
      payload,
      timestamp: Date.now()
    };
    this.listeners.forEach(listener => listener(event));
  }
}

export const eventBus = new EventBus();
