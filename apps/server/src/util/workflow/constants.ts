export class States {
  // Exception
  static ALL = 'States.ALL';
  static BranchFailed = 'States.BranchFailed';
  static IntrinsicFailure = 'States.IntrinsicFailure';
  static NoChoiceMatched = 'States.NoChoiceMatched';
  static ParameterPathFailure = 'States.ParameterPathFailure';
  static Permissions = 'States.Permissions';
  static ResultPathMatchFailure = 'States.ResultPathMatchFailure';
  static TaskFailed = 'States.TaskFailed';
  static TimeOut = 'States.TimeOut';

  // Intrinsic functions
  static now = 'States.now';
  static dateTime = 'States.dateTime';
  static afterSeconds = 'States.afterSeconds';
  static verifyCode = 'States.verifyCode';
  static cryptoPassword = 'States.cryptoPassword';
}
