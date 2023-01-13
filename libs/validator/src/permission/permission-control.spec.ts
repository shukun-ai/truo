import { TypeException } from '@shukun/exception';

import { PermissionControl } from './permission-control';
import { GrantList, GrantRoles } from './permission-control.type';

describe('PermissionControl', () => {
  describe('Exception', () => {
    const grantList: GrantList = [];

    it('should throw error, when did not find any role.', () => {
      const grantRoles: GrantRoles = ['cfo'];
      const permissionControl = new PermissionControl(grantList, grantRoles);
      expect(() => permissionControl.grantView('products_page')).toThrow(
        new TypeException('Did not find correct role.'),
      );
    });

    it('should throw error, when did not find any role.', () => {
      const grantRoles: GrantRoles = [];
      const permissionControl = new PermissionControl(grantList, grantRoles);
      expect(() => permissionControl.grantView('products_page')).toThrow(
        new TypeException('Did not find correct role.'),
      );
    });
  });

  describe('grantSource', () => {
    const grantList: GrantList = [
      {
        name: 'coo',
        permissions: [
          'source/orders/create',
          'source/orders/read',
          'source/orders/update',
          'source/orders/delete',
          'view/orders_page',
        ],
      },
      {
        name: 'cfo',
        permissions: ['source/orders/readOwn'],
      },
    ];

    it('should pass, when coo has create permission', () => {
      const grantRoles: GrantRoles = ['coo'];
      const permissionControl = new PermissionControl(grantList, grantRoles);
      const granted = permissionControl.grantSource('orders', 'create');
      expect(granted).toEqual(true);
    });

    it('should pass, when coo has read permission', () => {
      const grantRoles: GrantRoles = ['coo'];
      const permissionControl = new PermissionControl(grantList, grantRoles);
      const granted = permissionControl.grantSource('orders', 'read');
      expect(granted).toEqual(true);
    });

    it('should pass, when coo has update permission', () => {
      const grantRoles: GrantRoles = ['coo'];
      const permissionControl = new PermissionControl(grantList, grantRoles);
      const granted = permissionControl.grantSource('orders', 'update');
      expect(granted).toEqual(true);
    });

    it('should pass, when coo has delete permission', () => {
      const grantRoles: GrantRoles = ['coo'];
      const permissionControl = new PermissionControl(grantList, grantRoles);
      const granted = permissionControl.grantSource('orders', 'delete');
      expect(granted).toEqual(true);
    });

    it('should pass, if coo has read permission, he has readOwn as well.', () => {
      const grantRoles: GrantRoles = ['coo'];
      const permissionControl = new PermissionControl(grantList, grantRoles);
      const granted = permissionControl.grantSource('orders', 'readOwn');
      expect(granted).toEqual(true);
    });

    it('should pass, if cfo has readOwn permission.', () => {
      const grantRoles: GrantRoles = ['cfo'];
      const permissionControl = new PermissionControl(grantList, grantRoles);
      const granted = permissionControl.grantSource('orders', 'readOwn');
      expect(granted).toEqual(true);
    });

    it('should throw error, if cfo has readOwn permission, but he did not has read permission.', () => {
      const grantRoles: GrantRoles = ['cfo'];
      const permissionControl = new PermissionControl(grantList, grantRoles);
      const granted = permissionControl.grantSource('orders', 'read');
      expect(granted).toEqual(false);
    });

    it('should pass, if coo has read permission, cfo has readOwn, then should has read permission.', () => {
      const grantRoles: GrantRoles = ['coo', 'cfo'];
      const permissionControl = new PermissionControl(grantList, grantRoles);
      const granted = permissionControl.grantSource('orders', 'read');
      expect(granted).toEqual(true);
    });
  });

  describe('grantView', () => {
    const grantList: GrantList = [
      {
        name: 'coo',
        permissions: ['view/orders_page'],
      },
    ];

    it('should pass, when coo has view permission', () => {
      const grantRoles: GrantRoles = ['coo'];
      const permissionControl = new PermissionControl(grantList, grantRoles);
      const granted = permissionControl.grantView('orders_page');
      expect(granted).toEqual(true);
    });

    it('should pass, when cfo did not have view permission', () => {
      const grantRoles: GrantRoles = ['coo'];
      const permissionControl = new PermissionControl(grantList, grantRoles);
      const granted = permissionControl.grantView('products_page');
      expect(granted).toEqual(false);
    });
  });

  describe('grantWebhook', () => {
    const grantList: GrantList = [
      {
        name: 'coo',
        permissions: ['webhook/create_password'],
      },
    ];

    it('should pass, when coo has view permission', () => {
      const grantRoles: GrantRoles = ['coo'];
      const permissionControl = new PermissionControl(grantList, grantRoles);
      const granted = permissionControl.grantWebhook('create_password');
      expect(granted).toEqual(true);
    });
  });
});
