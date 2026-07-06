export interface LogMessage {
  level: 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
  meta?: any;
}

export interface LogTransport {
  send(log: LogMessage): void;
}

export class ConsoleTransport implements LogTransport {
  send(log: LogMessage) {
    const output = `[${log.timestamp}] [${log.level.toUpperCase()}]: ${log.message}`;
    switch (log.level) {
      case 'info':
        console.log(output, log.meta ?? '');
        break;
      case 'warn':
        console.warn(output, log.meta ?? '');
        break;
      case 'error':
        console.error(output, log.meta ?? '');
        break;
    }
  }
}
