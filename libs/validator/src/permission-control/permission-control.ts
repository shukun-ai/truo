import { RoleSchema } from '@shukun/schema';

import { IPermissionControl } from './permission-control.interface';
import { GrantedRoles, PermissionNodes } from './permission-control.type';

import { PermissionConvertor } from './permission-convertor';
import { PermissionGranter } from './permission-granter';
import { PermissionParser } from './permission-parser';

export class PermissionControl implements IPermissionControl {
  private permissions: PermissionNodes[];

  private granter: PermissionGranter;

  constructor(
    private readonly roles: RoleSchema[],
    private readonly grantedRoles: GrantedRoles,
  ) {
    const permissionConvertor = new PermissionConvertor();
    const permissionParser = new PermissionParser(permissionConvertor);
    this.permissions = permissionParser.parse(this.roles, this.grantedRoles);
    this.granter = new PermissionGranter(this.permissions);
  }

  public grant(type: string, name: string, action?: string): boolean {
    return this.granter.grant(type, name, action);
  }
}
