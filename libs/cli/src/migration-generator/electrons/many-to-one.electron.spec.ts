import { MetadataElectron, MetadataFieldType } from '@shukun/schema';

import { ManyToOneElectron } from './many-to-one.electron';

describe('ManyToOne Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.ManyToOne,
        isRequired: true,
      };

      const field = new ManyToOneElectron();
      const output = field.buildSqlSchema(electron);
      expect(output).toEqual(`.string('mock', 255)`);
    });
  });
});
