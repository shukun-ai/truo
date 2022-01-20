import { States } from '../constants';

export class ResultPathMatchFailure extends Error {
  constructor(message?: string) {
    super(message);
    this.name = States.ResultPathMatchFailure;
  }
}
