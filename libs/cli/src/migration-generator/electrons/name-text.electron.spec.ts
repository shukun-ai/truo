import { MetadataElectron, MetadataFieldType } from '@shukun/schema';

import { NameTextElectron } from './name-text.electron';

describe('NameText Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.NameText,
        isRequired: true,
      };

      const field = new NameTextElectron();
      const output = field.buildSqlSchema(electron);
      expect(output).toEqual(`.string('mock', 1000)`);
    });
  });
});
