import { ExceptionStatus } from '../flow.constants';

export class FlowDefinitionException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = ExceptionStatus.FlowDefinitionException;
  }
}
