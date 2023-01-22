import { AccessInternalRoles, RoleSchema } from '@shukun/schema';

import { PermissionControl } from '@shukun/validator';

export function isGranted(options: {
  grantList: RoleSchema[];
  grantRoles: string[];
  type: string;
  name: string;
  action?: string;
}): boolean {
  const { grantList, grantRoles, type, name, action } = options;

  if (grantRoles.includes(AccessInternalRoles.Owner)) {
    return true;
  }

  const permissionControl = new PermissionControl(grantList, grantRoles);
  return permissionControl.grant(type, name, action);
}
