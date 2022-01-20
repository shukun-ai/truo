import { States } from '../constants';

export class IntrinsicFailure extends Error {
  constructor(message?: string) {
    super(message);
    this.name = States.IntrinsicFailure;
  }
}
