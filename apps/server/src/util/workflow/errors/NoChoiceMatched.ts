import { States } from '../constants';

export class NoChoiceMatched extends Error {
  constructor(message?: string) {
    super(message);
    this.name = States.NoChoiceMatched;
  }
}
