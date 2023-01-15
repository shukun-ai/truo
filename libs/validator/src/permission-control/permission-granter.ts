import {
  PermissionNodes,
  SOURCE_QUERY_FAMILY,
  SOURCE_UPDATE_FAMILY,
} from './permission-control.type';

export class PermissionGranter {
  constructor(private readonly permissions: PermissionNodes[]) {}

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
}
