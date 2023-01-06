import { MetadataElectron, MetadataFieldType } from '@shukun/schema';

import { MixedElectron } from './mixed.electron';

describe('Mixed Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.Text,
        isRequired: true,
      };

      const field = new MixedElectron();
      const output = field.buildSqlSchema(electron);
      expect(output).toEqual(`.json('mock')`);
    });
  });
});
