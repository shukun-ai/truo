import { States } from '../constants';

export class ParameterPathFailure extends Error {
  constructor(message?: string) {
    super(message);
    this.name = States.ParameterPathFailure;
  }
}
