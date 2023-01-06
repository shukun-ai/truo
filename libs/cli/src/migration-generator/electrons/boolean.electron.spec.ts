import { MetadataElectron, MetadataFieldType } from '@shukun/schema';

import { BooleanElectron } from './boolean.electron';

describe('Boolean Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show timestamp.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.Boolean,
        isRequired: true,
      };

      const field = new BooleanElectron();
      const output = field.buildSqlSchema(electron);
      expect(output).toEqual(`.boolean('mock')`);
    });
  });
});
