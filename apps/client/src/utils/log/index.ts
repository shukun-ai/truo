export class Log {
  warn(message: string, ...args: unknown[]) {
    // eslint-disable-next-line no-console
    console.warn(message, ...args);
  }

  error(message: string, ...args: unknown[]) {
    // eslint-disable-next-line no-console
    console.error(message, ...args);
  }
}

export const log = new Log();
