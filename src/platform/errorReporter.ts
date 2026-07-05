import { logger } from './logger';

export interface ErrorPayload {
  message: string;
  source?: string;
  lineno?: number;
  colno?: number;
  error?: any;
  timestamp: string;
}

class ErrorReporter {
  private errors: ErrorPayload[] = [];

  init() {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', (event) => {
        this.report({
          message: event.message,
          source: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          error: event.error,
          timestamp: new Date().toISOString()
        });
      });

      window.addEventListener('unhandledrejection', (event) => {
        this.report({
          message: event.reason?.message || String(event.reason),
          error: event.reason,
          timestamp: new Date().toISOString()
        });
      });
    }
  }

  report(payload: ErrorPayload) {
    this.errors.push(payload);
    logger.error('[ErrorReporter] Captured Exception:', payload.message, payload.error ?? '');
  }

  getErrors(): ErrorPayload[] {
    return this.errors;
  }

  clear() {
    this.errors = [];
  }
}

export const errorReporter = new ErrorReporter();
