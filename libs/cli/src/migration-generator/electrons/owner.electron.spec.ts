import { MetadataElectron, MetadataFieldType } from '@shukun/schema';

import { OwnerElectron } from './owner.electron';

describe('Owner Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.Owner,
        isRequired: true,
      };

      const field = new OwnerElectron();
      const output = field.buildSqlSchema(electron);
      expect(output).toEqual(`.string('mock', 255)`);
    });
  });
});
