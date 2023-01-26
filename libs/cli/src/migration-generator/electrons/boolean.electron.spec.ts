import { MetadataElectron } from '@shukun/schema';

import { BooleanElectron } from './boolean.electron';

describe('Boolean Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show timestamp.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: 'Boolean',
        isRequired: true,
      };

      const field = new BooleanElectron(electron);
      const output = field.buildSqlSchema();
      expect(output).toEqual(`.boolean('mock')`);
    });
  });
});
