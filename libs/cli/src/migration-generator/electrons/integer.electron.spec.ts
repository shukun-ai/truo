import { MetadataElectron, MetadataFieldType } from '@shukun/schema';

import { IntegerElectron } from './integer.electron';

describe('Integer Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.Integer,
        isRequired: true,
      };

      const field = new IntegerElectron();
      const output = field.buildSqlSchema(electron);
      expect(output).toEqual(`.bigInteger('mock')`);
    });
  });
});
