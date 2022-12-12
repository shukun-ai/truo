import { ExceptionStatus } from '../constants';

export class FlowNoCompiledCodeException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = ExceptionStatus.FlowNoCompiledCodeException;
  }
}
