import { RoleSchema } from '@shukun/schema';

import { union } from 'lodash';

import { IPermissionControl } from './permission-control.interface';
import {
  GrantedRoles,
  PermissionNodes,
  SOURCE_QUERY_FAMILY,
  SOURCE_UPDATE_FAMILY,
} from './permission-control.type';

import { PermissionConvertor } from './permission-convertor';

export class PermissionControl implements IPermissionControl {
  private permissions: PermissionNodes[];

  constructor(
    private readonly roles: RoleSchema[],
    private readonly grantedRoles: GrantedRoles,
  ) {
    this.permissions = this.createPermissions();
  }

  public grant(type: string, name: string, action?: string): boolean {
    return this.permissions.some(
      (permission) =>
        permission.type === type &&
        permission.name === name &&
        permission.action === this.validateAction(permission, action),
    );
  }

  private validateAction(
    permission: PermissionNodes,
    action?: string,
  ): string | null {
    if (this.isSourceQuery(permission, action)) {
      return 'query';
    }

    if (this.isSourceUpdate(permission, action)) {
      return 'update';
    }

    return action ?? null;
  }

  private isSourceQuery(permission: PermissionNodes, action?: string): boolean {
    return (
      !!action &&
      permission.type === 'source' &&
      permission.action === 'query' &&
      SOURCE_QUERY_FAMILY.includes(action)
    );
  }

  private isSourceUpdate(
    permission: PermissionNodes,
    action?: string,
  ): boolean {
    return (
      !!action &&
      permission.type === 'source' &&
      permission.action === 'update' &&
      SOURCE_UPDATE_FAMILY.includes(action)
    );
  }

  private createPermissions(): PermissionNodes[] {
    return this.roles
      .filter(this.filterRoles.bind(this))
      .reduce(this.mergePermissions.bind(this), [])
      .map((value) => new PermissionConvertor().parse(value));
  }

  private filterRoles(role: RoleSchema) {
    return this.grantedRoles.includes(role.name);
  }

  private mergePermissions(permissions: string[], role: RoleSchema) {
    return union(permissions, role.permissions);
  }
}
