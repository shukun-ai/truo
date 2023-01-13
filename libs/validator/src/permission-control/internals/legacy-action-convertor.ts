import { TypeException } from '@shukun/exception';

import { AcPermission } from './external-access-control.type';

export class LegacyActionConvertor {
  parse(action: string): AcPermission['action'] {
    switch (action) {
      case 'create':
        return 'create:any';
      case 'read':
        return 'read:any';
      case 'update':
        return 'update:any';
      case 'delete':
        return 'delete:any';
      case 'readOwn':
        return 'read:own';
      case 'updateOwn':
        return 'update:own';
      case 'deleteOwn':
        return 'delete:own';
      default:
        throw new TypeException('Did not find this role action: {{action}}', {
          action,
        });
    }
  }
}
