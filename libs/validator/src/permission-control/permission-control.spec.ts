import { RoleSchema } from '@shukun/schema';

import { PermissionControl } from './permission-control';

describe('PermissionControl', () => {
  describe('grant', () => {
    const roles: RoleSchema[] = [
      {
        name: 'admin',
        label: 'admin',
        permissions: [
          'source:orders:query',
          'source:refunds:query',
          'view:orders_page',
        ],
      },
      {
        name: 'client',
        label: 'client',
        permissions: ['source:orders:query:own'],
      },
    ];

    it('If the admin has query orders, return true', () => {
      const control = new PermissionControl(roles, ['admin']);
      const output = control.grant('source', 'orders', 'query');
      expect(output).toEqual(true);
    });

    it('If the client has query own orders, return true, because we did not filter data here.', () => {
      const control = new PermissionControl(roles, ['client']);
      const output = control.grant('source', 'orders', 'query');
      expect(output).toEqual(true);
    });

    it('If the client has query refunds, then return false.', () => {
      const control = new PermissionControl(roles, ['client']);
      const output = control.grant('source', 'refunds', 'query');
      expect(output).toEqual(false);
    });

    it('If the role extends admin and client has query refunds, return true.', () => {
      const control = new PermissionControl(roles, ['admin', 'client']);
      const output = control.grant('source', 'refunds', 'query');
      expect(output).toEqual(true);
    });

    it('If the admin check view, return true', () => {
      const control = new PermissionControl(roles, ['admin']);
      const output = control.grant('view', 'orders_page');
      expect(output).toEqual(true);
    });

    it('If the client check view, return false', () => {
      const control = new PermissionControl(roles, ['client']);
      const output = control.grant('view', 'orders_page');
      expect(output).toEqual(false);
    });
  });

  describe('grant source child actions: query', () => {
    const roles: RoleSchema[] = [
      {
        name: 'admin',
        label: 'admin',
        permissions: ['source:orders:query'],
      },
    ];

    it('if curd, should can metadata.', () => {
      const control = new PermissionControl(roles, ['admin']);
      expect(control.grant('source', 'orders', 'metadata')).toEqual(true);
    });

    it('if curd, should can query.', () => {
      const control = new PermissionControl(roles, ['admin']);
      expect(control.grant('source', 'orders', 'query')).toEqual(true);
    });
  });

  describe('grant source child actions: update', () => {
    const roles: RoleSchema[] = [
      {
        name: 'admin',
        label: 'admin',
        permissions: ['source:orders:update'],
      },
    ];

    it('if curd, should can update.', () => {
      const control = new PermissionControl(roles, ['admin']);
      expect(control.grant('source', 'orders', 'update')).toEqual(true);
    });

    it('if curd, should can add-to-many.', () => {
      const control = new PermissionControl(roles, ['admin']);
      expect(control.grant('source', 'orders', 'add-to-many')).toEqual(true);
    });

    it('if curd, should can remove-from-many.', () => {
      const control = new PermissionControl(roles, ['admin']);
      expect(control.grant('source', 'orders', 'remove-from-many')).toEqual(
        true,
      );
    });

    it('if curd, should can increase.', () => {
      const control = new PermissionControl(roles, ['admin']);
      expect(control.grant('source', 'orders', 'increase')).toEqual(true);
    });
  });
});
