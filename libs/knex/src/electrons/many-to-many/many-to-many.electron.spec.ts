import { ManyToManyElectron } from './many-to-many.electron';

describe('ManyToMany Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should throw error when ManyToMany.', () => {
      const field = new ManyToManyElectron();
      expect(() => field.buildSqlSchema()).toThrow(
        new Error('Did not support ManyToMany type in SQL Schema.'),
      );
    });
  });
});
