import { errorReporter } from './errorReporter';

export function wrapErrorBoundary<T extends (...args: any[]) => any>(
  fn: T,
  fallbackValue?: ReturnType<T>
): (...args: Parameters<T>) => ReturnType<T> {
  return function (...args: Parameters<T>): ReturnType<T> {
    try {
      return fn(...args);
    } catch (err: any) {
      errorReporter.report({
        message: err?.message || String(err),
        error: err,
        timestamp: new Date().toISOString()
      });
      return fallbackValue as ReturnType<T>;
    }
  };
}
