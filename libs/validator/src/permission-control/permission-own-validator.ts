import { PermissionNodes } from './permission-control.type';

export class PermissionOwnValidator {
  constructor(private readonly permissions: PermissionNodes[]) {}

  onlyQueryOwn(name: string): boolean {
    return this.onlyOwn(name, 'query');
  }

  onlyUpdateOwn(name: string): boolean {
    return this.onlyOwn(name, 'update');
  }

  onlyDeleteOwn(name: string): boolean {
    return this.onlyOwn(name, 'delete');
  }

  private onlyOwn(name: string, action: string) {
    const matched = this.permissions.filter(
      (permission) =>
        permission.type === 'source' &&
        permission.name === name &&
        permission.action === action,
    );

    return matched.every((permission) => permission.recordMode === 'own');
  }
}
