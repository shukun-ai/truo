import { GrantAction } from './permission-control.type';

export interface IPermissionControl {
  grantSource(name: string, action: GrantAction): boolean;
  grantView(name: string): boolean;
  grantWebhook(name: string): boolean;
}
