import { MetadataElectron, MetadataFieldType } from '@shukun/schema';

import { TextElectron } from './text.electron';

describe('text', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.Text,
        isRequired: true,
      };

      const field = new TextElectron();
      const output = field.buildSqlSchema(electron);
      expect(output).toEqual(`.string('mock', 1000)`);
    });
  });
});
