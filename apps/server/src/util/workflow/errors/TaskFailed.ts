import { States } from '../constants';

export class TaskFailed extends Error {
  constructor(message?: string) {
    super(message);
    this.name = States.TaskFailed;
  }
}

// TimeOut,
//   TaskFailed,
//   Permissions,
//   ResultPathMatchFailure,
//   ParameterPathFailure,
//   BranchFailed,
//   NoChoiceMatched,
//   IntrinsicFailure;
