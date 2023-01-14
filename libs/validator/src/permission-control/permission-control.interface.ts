export interface IPermissionControl {
  grant(type: string, name: string, action?: string): boolean;
}
