import { MetadataElectron, MetadataFieldType } from '@shukun/schema';

import { SingleSelectElectron } from './single-select.electron';

describe('SingleSelect Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.SingleSelect,
        isRequired: true,
      };

      const field = new SingleSelectElectron();
      const output = field.buildSqlSchema(electron);
      expect(output).toEqual(`.string('mock', 1000)`);
    });
  });
});
