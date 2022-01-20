import { States } from '../constants';

export class BranchFailed extends Error {
  constructor(message?: string) {
    super(message);
    this.name = States.BranchFailed;
  }
}
