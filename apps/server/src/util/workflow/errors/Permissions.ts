import { States } from '../constants';

export class Permissions extends Error {
  constructor(message?: string) {
    super(message);
    this.name = States.Permissions;
  }
}
