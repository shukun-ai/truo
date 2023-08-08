import { TypeException } from '@shukun/exception';

import { PermissionNodes } from './permission-control.type';
import { PermissionOwnValidator } from './permission-own-validator';

describe('PermissionOwnValidator', () => {
  describe('onlyReadOwn', () => {
    it('if has read any and read own, then return false.', () => {
      const permissions: PermissionNodes[] = [
        {
          type: 'source',
          name: 'orders',
          action: 'read',
          recordMode: 'any',
          attributeMode: 'allow',
          reverseAttributes: [],
        },
        {
          type: 'source',
          name: 'orders',
          action: 'read',
          recordMode: 'own',
          attributeMode: 'allow',
          reverseAttributes: [],
        },
      ];
      expect(
        new PermissionOwnValidator(permissions).onlyReadOwn('orders'),
      ).toEqual(false);
    });

    it('if has read own only, then return true.', () => {
      const permissions: PermissionNodes[] = [
        {
          type: 'source',
          name: 'orders',
          action: 'read',
          recordMode: 'own',
          attributeMode: 'allow',
          reverseAttributes: [],
        },
        {
          type: 'source',
          name: 'orders',
          action: 'read',
          recordMode: 'own',
          attributeMode: 'allow',
          reverseAttributes: [],
        },
      ];
      expect(
        new PermissionOwnValidator(permissions).onlyReadOwn('orders'),
      ).toEqual(true);
    });

    it('if has read any, then return false.', () => {
      const permissions: PermissionNodes[] = [
        {
          type: 'source',
          name: 'orders',
          action: 'read',
          recordMode: 'any',
          attributeMode: 'allow',
          reverseAttributes: [],
        },
        {
          type: 'source',
          name: 'orders',
          action: 'read',
          recordMode: 'any',
          attributeMode: 'allow',
          reverseAttributes: [],
        },
      ];
      expect(
        new PermissionOwnValidator(permissions).onlyReadOwn('orders'),
      ).toEqual(false);
    });

    it('if has wrong type, name or action, then throw error.', () => {
      const permissions: PermissionNodes[] = [
        {
          type: 'webhook',
          name: 'orders',
          action: 'read',
          recordMode: 'any',
          attributeMode: 'allow',
          reverseAttributes: [],
        },
        {
          type: 'source',
          name: 'orders',
          action: 'mock_action',
          recordMode: 'any',
          attributeMode: 'allow',
          reverseAttributes: [],
        },
      ];
      expect(() =>
        new PermissionOwnValidator(permissions).onlyReadOwn('orders'),
      ).toThrow(
        new TypeException(
          'Did not find matched permissions to check own or all, name is {{name}} and action is {{ action }}',
          {
            name: 'orders',
            action: 'read',
          },
        ),
      );
    });
  });

  describe('onlyUpdateOwn', () => {
    it('if has update any and update own, then return false.', () => {
      const permissions: PermissionNodes[] = [
        {
          type: 'source',
          name: 'orders',
          action: 'update',
          recordMode: 'any',
          attributeMode: 'allow',
          reverseAttributes: [],
        },
        {
          type: 'source',
          name: 'orders',
          action: 'update',
          recordMode: 'own',
          attributeMode: 'allow',
          reverseAttributes: [],
        },
      ];
      expect(
        new PermissionOwnValidator(permissions).onlyUpdateOwn('orders'),
      ).toEqual(false);
    });
  });

  describe('onlyDeleteOwn', () => {
    it('if has delete any and delete own, then return false.', () => {
      const permissions: PermissionNodes[] = [
        {
          type: 'source',
          name: 'orders',
          action: 'delete',
          recordMode: 'any',
          attributeMode: 'allow',
          reverseAttributes: [],
        },
        {
          type: 'source',
          name: 'orders',
          action: 'delete',
          recordMode: 'own',
          attributeMode: 'allow',
          reverseAttributes: [],
        },
      ];
      expect(
        new PermissionOwnValidator(permissions).onlyDeleteOwn('orders'),
      ).toEqual(false);
    });
  });
});
