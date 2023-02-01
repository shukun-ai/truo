import { RoleElectron } from './role.electron';

describe('Role Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should throw error when Role.', () => {
      const field = new RoleElectron();
      expect(() => field.buildSqlSchema()).toThrow(
        new Error('Did not support Role type in SQL Schema.'),
      );
    });
  });
});
