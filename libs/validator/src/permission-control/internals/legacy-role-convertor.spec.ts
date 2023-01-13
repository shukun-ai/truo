import { TypeException } from '@shukun/exception';

import { LegacyRoleConvertor } from './legacy-role-convertor';

describe('LegacyRoleConvertor', () => {
  describe('parse', () => {
    it('should pass, when source string permission', () => {
      const stringPermission = 'source/orders/read';
      const output = new LegacyRoleConvertor().parse(stringPermission);
      expect(output).toEqual({
        resource: 'source/orders',
        action: 'read:any',
        attributes: '*',
      });
    });

    it('should pass, when source string permission with attributes', () => {
      const stringPermission = 'source/orders/read/*,name,!isPublic';
      const output = new LegacyRoleConvertor().parse(stringPermission);
      expect(output).toEqual({
        resource: 'source/orders',
        action: 'read:any',
        attributes: '*,name,!isPublic',
      });
    });

    it('should throw error, when source string permission did not include action.', () => {
      const stringPermission = 'source/orders';
      expect(() => {
        new LegacyRoleConvertor().parse(stringPermission);
      }).toThrow(
        new TypeException('Forget to configure "action" in permission.'),
      );
    });

    it('should pass, when view and read', () => {
      const stringPermission = 'view/orders_page';
      const output = new LegacyRoleConvertor().parse(stringPermission);
      expect(output).toEqual({
        resource: 'view/orders_page',
        action: 'read:any',
        attributes: '*',
      });
    });

    it('should pass, when webhook and create', () => {
      const stringPermission = 'webhook/create_order';
      const output = new LegacyRoleConvertor().parse(stringPermission);
      expect(output).toEqual({
        resource: 'webhook/create_order',
        action: 'create:any',
        attributes: '*',
      });
    });

    it('should throw error, when source did not supported.', () => {
      const stringPermission = 'developer/codebase';
      expect(() => {
        new LegacyRoleConvertor().parse(stringPermission);
      }).toThrow(
        new TypeException('Did not support resource type: {{type}}', {
          type: 'developer',
        }),
      );
    });

    it('should pass, when source update own.', () => {
      const stringPermission = 'source/orders/updateOwn';
      const output = new LegacyRoleConvertor().parse(stringPermission);
      expect(output).toEqual({
        resource: 'source/orders',
        action: 'update:own',
        attributes: '*',
      });
    });

    it('should pass, when source delete own', () => {
      const stringPermission = 'source/orders/deleteOwn';
      const output = new LegacyRoleConvertor().parse(stringPermission);
      expect(output).toEqual({
        resource: 'source/orders',
        action: 'delete:own',
        attributes: '*',
      });
    });

    it('should throw error, when action did not find.', () => {
      const stringPermission = 'source/orders/remove';
      expect(() => new LegacyRoleConvertor().parse(stringPermission)).toThrow(
        new TypeException('Did not find this role action: {{action}}', {
          action: 'remove',
        }),
      );
    });

    it('should throw error, when string permission is not correct.', () => {
      const stringPermission = 'source';
      expect(() => new LegacyRoleConvertor().parse(stringPermission)).toThrow(
        new TypeException(
          'Did not find resource type and name: {{stringPermission}}',
          {
            stringPermission: 'source',
          },
        ),
      );
    });

    it('should throw error, when resource type is not supported.', () => {
      const stringPermission = 'developer';
      expect(() => new LegacyRoleConvertor().parse(stringPermission)).toThrow(
        new TypeException(
          'Did not find resource type and name: {{stringPermission}}',
          {
            stringPermission: 'developer',
          },
        ),
      );
    });
  });
});
