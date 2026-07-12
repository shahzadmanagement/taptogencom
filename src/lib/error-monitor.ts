import { eventBus } from './event-bus';

export interface ErrorPayload {
  message: string;
  source?: string;
  lineno?: number;
  colno?: number;
  stack?: string;
  type: 'runtime' | 'promise' | 'workspace' | 'feature' | 'experiment';
  timestamp: string;
}

class ErrorMonitor {
  private errors: ErrorPayload[] = [];

  init(): void {
    if (typeof window === 'undefined') return;

    // 1. Capture JS Runtime Exceptions
    window.addEventListener('error', (event) => {
      const payload: ErrorPayload = {
        message: event.message || 'Unknown runtime error',
        source: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        type: 'runtime',
        timestamp: new Date().toISOString()
      };
      this.logError(payload);
    });

    // 2. Capture Unhandled Promise Rejections
    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason;
      const payload: ErrorPayload = {
        message: reason instanceof Error ? reason.message : String(reason),
        stack: reason instanceof Error ? reason.stack : undefined,
        type: 'promise',
        timestamp: new Date().toISOString()
      };
      this.logError(payload);
    });
  }

  logError(payload: ErrorPayload): void {
    this.errors.push(payload);
    // Keep internal stack limited to 50 entries
    if (this.errors.length > 50) this.errors.shift();

    eventBus.publish('tool_error', payload, 'high');
  }

  getErrors(): ErrorPayload[] {
    return this.errors;
  }

  clearErrors(): void {
    this.errors = [];
  }
}

export const errorMonitor = new ErrorMonitor();
export default errorMonitor;
