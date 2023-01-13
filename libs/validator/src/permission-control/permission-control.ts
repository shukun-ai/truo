import { TypeException } from '@shukun/exception';
import { AccessControl } from 'accesscontrol';

import { AcPermission } from './internals/external-access-control.type';
import { LegacyActionConvertor } from './internals/legacy-action-convertor';
import { LegacyRoleConvertor } from './internals/legacy-role-convertor';
import { IPermissionControl } from './permission-control.interface';
import {
  AllowedResourceTypes,
  GrantAction,
  GrantList,
  GrantRoles,
} from './permission-control.type';

export class PermissionControl implements IPermissionControl {
  private acPermissions: AcPermission[];

  private ac: AccessControl;

  constructor(
    private readonly grantList: GrantList,
    private readonly grantRoles: GrantRoles,
  ) {
    this.acPermissions = this.prepareAcPermissions(this.grantList);
    this.ac = new AccessControl(this.acPermissions);
  }

  public grantSource(name: string, action: GrantAction): boolean {
    const permission = this.getAcPermission(
      AllowedResourceTypes.Source,
      name,
      action,
    );
    return permission.granted;
  }

  public grantView(name: string): boolean {
    const permission = this.getAcPermission(
      AllowedResourceTypes.View,
      name,
      'read',
    );
    return permission.granted;
  }

  public grantWebhook(name: string): boolean {
    const permission = this.getAcPermission(
      AllowedResourceTypes.Webhook,
      name,
      'create',
    );
    return permission.granted;
  }

  private getAcPermission(
    type: AllowedResourceTypes,
    name: string,
    action: GrantAction,
  ) {
    try {
      return this.ac.permission({
        role: this.grantRoles,
        action: this.prepareAcAction(action),
        resource: this.combineAcResource(type, name),
      });
    } catch (error) {
      throw new TypeException('Did not find correct role.');
    }
  }

  private prepareAcPermissions(grantList: GrantList): AcPermission[] {
    const acPermissions: AcPermission[] = [];

    grantList.forEach((role) => {
      role.permissions.forEach((permission) => {
        acPermissions.push(this.prepareAcPermission(role.name, permission));
      });
    });

    return acPermissions;
  }

  private prepareAcPermission(
    roleName: string,
    stringPermission: string,
  ): AcPermission {
    const acPartialPermission = new LegacyRoleConvertor().parse(
      stringPermission,
    );

    return {
      role: roleName,
      ...acPartialPermission,
    };
  }

  private prepareAcAction(action: GrantAction): AcPermission['action'] {
    return new LegacyActionConvertor().parse(action);
  }

  private combineAcResource(
    resourceType: AllowedResourceTypes,
    resourceName: string,
  ): string {
    return `${resourceType}/${resourceName}`;
  }
}
