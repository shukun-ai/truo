import { MetadataElectron } from '@shukun/schema';

import { NameTextElectron } from './name-text.electron';

describe('NameText Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: 'NameText',
        isRequired: true,
      };

      const field = new NameTextElectron(electron);
      const output = field.buildSqlSchema();
      expect(output).toEqual(`.string('mock', 1000)`);
    });
  });
});
