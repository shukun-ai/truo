import { PermissionGranter } from './permission-granter';
import { PermissionOwnValidator } from './permission-own-validator';

export interface IPermissionControl {
  grant(type: string, name: string, action?: string): boolean;
  getGranter(): PermissionGranter;
  getOwnValidator(): PermissionOwnValidator;
}
