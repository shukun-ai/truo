import { MetadataElectron, MetadataFieldType } from '@shukun/schema';

import { LargeTextElectron } from './large-text.electron';

describe('LargeText Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.LargeText,
        isRequired: true,
      };

      const field = new LargeTextElectron();
      const output = field.buildSqlSchema(electron);
      expect(output).toEqual(`.text('mock')`);
    });
  });
});
