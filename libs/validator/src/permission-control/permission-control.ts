import { RoleSchema, AccessInternalRoles } from '@shukun/schema';

import { IPermissionControl } from './permission-control.interface';
import { GrantedRoles, PermissionNodes } from './permission-control.type';

import { PermissionConvertor } from './permission-convertor';
import { PermissionGranter } from './permission-granter';
import { PermissionOwnValidator } from './permission-own-validator';
import { PermissionParser } from './permission-parser';

export class PermissionControl implements IPermissionControl {
  private permissions: PermissionNodes[];

  private granter: PermissionGranter;

  private ownValidator: PermissionOwnValidator;

  constructor(
    private readonly roles: RoleSchema[],
    private readonly grantedRoles: GrantedRoles,
  ) {
    const permissionConvertor = new PermissionConvertor();
    const permissionParser = new PermissionParser(permissionConvertor);
    this.permissions = permissionParser.parse(this.roles, this.grantedRoles);
    this.granter = new PermissionGranter(this.permissions);
    this.ownValidator = new PermissionOwnValidator(this.permissions);
  }

  public isOwner() {
    return this.grantedRoles.includes(AccessInternalRoles.Owner);
  }

  public grant(type: string, name: string, action?: string): boolean {
    return this.granter.grant(type, name, action);
  }

  public getGranter(): PermissionGranter {
    return this.granter;
  }

  public getOwnValidator(): PermissionOwnValidator {
    return this.ownValidator;
  }
}
