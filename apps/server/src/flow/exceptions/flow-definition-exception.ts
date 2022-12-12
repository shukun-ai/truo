import { ExceptionStatus } from '../constants';

export class FlowDefinitionException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = ExceptionStatus.FlowDefinitionException;
  }
}
