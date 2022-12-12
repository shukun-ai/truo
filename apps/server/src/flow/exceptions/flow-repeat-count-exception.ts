import { ExceptionStatus } from '../constants';

export class FlowRepeatCountException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = ExceptionStatus.FlowRepeatCountException;
  }
}
