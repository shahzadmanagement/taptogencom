export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class PlatformLogger {
  private isProd = typeof process !== 'undefined' && process.env.NODE_ENV === 'production';

  private log(level: LogLevel, message: string, ...args: any[]) {
    if (this.isProd && level !== 'error') {
      return; // Silent on production for non-errors
    }
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]:`;
    switch (level) {
      case 'debug':
        console.debug(prefix, message, ...args);
        break;
      case 'info':
        console.info(prefix, message, ...args);
        break;
      case 'warn':
        console.warn(prefix, message, ...args);
        break;
      case 'error':
        console.error(prefix, message, ...args);
        break;
    }
  }

  debug(message: string, ...args: any[]) {
    this.log('debug', message, ...args);
  }

  info(message: string, ...args: any[]) {
    this.log('info', message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this.log('warn', message, ...args);
  }

  error(message: string, ...args: any[]) {
    this.log('error', message, ...args);
  }
}

export const logger = new PlatformLogger();
