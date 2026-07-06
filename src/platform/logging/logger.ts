import { ConsoleTransport, type LogTransport, type LogMessage } from './logTransport';

class PlatformLogger {
  private transports: LogTransport[] = [new ConsoleTransport()];

  addTransport(transport: LogTransport) {
    this.transports.push(transport);
  }

  private dispatch(level: LogMessage['level'], message: string, meta?: any) {
    const log: LogMessage = {
      level,
      message,
      timestamp: new Date().toISOString(),
      meta
    };
    this.transports.forEach(t => t.send(log));
  }

  info(msg: string, meta?: any) {
    this.dispatch('info', msg, meta);
  }

  warn(msg: string, meta?: any) {
    this.dispatch('warn', msg, meta);
  }

  error(msg: string, meta?: any) {
    this.dispatch('error', msg, meta);
  }
}

export const logger = new PlatformLogger();
