import { RoleSchema } from '@shukun/schema';
import { union } from 'lodash';

import { PermissionNodes } from './permission-control.type';
import { PermissionConvertor } from './permission-convertor';

export class PermissionParser {
  constructor(private readonly permissionConvertor: PermissionConvertor) {}

  public parse(roles: RoleSchema[], grantedRoles: string[]): PermissionNodes[] {
    return roles
      .filter((role) => this.filterRoles(role, grantedRoles))
      .reduce(this.mergePermissions.bind(this), [])
      .map((value) => this.permissionConvertor.parse(value));
  }

  private filterRoles(role: RoleSchema, grantedRoles: string[]) {
    return grantedRoles.includes(role.name);
  }

  private mergePermissions(permissions: string[], role: RoleSchema) {
    return union(permissions, role.permissions);
  }
}
