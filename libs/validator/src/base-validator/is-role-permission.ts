import { PermissionConvertor } from '../permission-control';

export function isRolePermission(value: unknown): boolean {
  if (typeof value !== 'string') {
    return false;
  }
  try {
    new PermissionConvertor().parse(value);
    return true;
  } catch (error) {
    return false;
  }
}
