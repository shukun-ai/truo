import { MultiSelectElectron } from './multi-select.electron';

describe('Role Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should throw error when MultiSelect.', () => {
      const field = new MultiSelectElectron();
      expect(() => field.buildSqlSchema()).toThrow(
        new Error('Did not support MultiSelect type in SQL Schema.'),
      );
    });
  });
});
