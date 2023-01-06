import { MetadataElectron, MetadataFieldType } from '@shukun/schema';

import { PasswordElectron } from './password.electron';

describe('Password Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.Password,
        isRequired: true,
      };

      const field = new PasswordElectron();
      const output = field.buildSqlSchema(electron);
      expect(output).toEqual(`.string('mock', 1000)`);
    });
  });
});
