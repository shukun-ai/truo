import { MetadataElectron } from '@shukun/schema';

import { SingleSelectElectron } from './single-select.electron';

describe('SingleSelect Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: 'SingleSelect',
        isRequired: true,
        options: [],
      };

      const field = new SingleSelectElectron(electron);
      const output = field.buildSqlSchema();
      expect(output).toEqual(`.string('mock', 1000)`);
    });
  });
});
