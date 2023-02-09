import { MetadataElectron } from '@shukun/schema';

import { OwnerElectron } from './owner.electron';

describe('Owner Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: 'Owner',
        isRequired: true,
      };

      const field = new OwnerElectron(electron);
      const output = field.buildSqlSchema();
      expect(output).toEqual(`.string('mock', 255)`);
    });
  });
});
