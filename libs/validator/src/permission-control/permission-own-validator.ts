import { TypeException } from '@shukun/exception';

import { PermissionNodes } from './permission-control.type';

export class PermissionOwnValidator {
  constructor(private readonly permissions: PermissionNodes[]) {}

  onlyReadOwn(name: string): boolean {
    return this.onlyOwn(name, 'read');
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

    if (matched.length === 0) {
      throw new TypeException(
        'Did not find matched permissions to check own or all, name is {{name}} and action is {{ action }}',
        {
          name,
          action,
        },
      );
    }

    return matched.every((permission) => permission.recordMode === 'own');
  }
}
