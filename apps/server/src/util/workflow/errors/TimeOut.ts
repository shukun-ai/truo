import { States } from '../constants';

export class TimeOut extends Error {
  constructor(message?: string) {
    super(message);
    this.name = States.TimeOut;
  }
}
