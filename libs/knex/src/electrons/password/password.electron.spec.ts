import { MetadataElectron } from '@shukun/schema';

import { PasswordElectron } from './password.electron';

describe('Password Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: 'Password',
        isRequired: true,
      };

      const field = new PasswordElectron(electron);
      const output = field.buildSqlSchema();
      expect(output).toEqual(`.string('mock', 1000)`);
    });
  });
});
