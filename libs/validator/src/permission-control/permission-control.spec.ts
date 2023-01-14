import { RoleSchema } from '@shukun/schema';

import { PermissionControl } from './permission-control';

describe('PermissionControl', () => {
  describe('grantRoles', () => {
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
});
