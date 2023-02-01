import { MetadataElectron } from '@shukun/schema';

import { TextElectron } from './text.electron';

describe('Text Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: 'Text',
        isRequired: true,
      };

      const field = new TextElectron(electron);
      const output = field.buildSqlSchema();
      expect(output).toEqual(`.string('mock', 1000)`);
    });
  });
});
