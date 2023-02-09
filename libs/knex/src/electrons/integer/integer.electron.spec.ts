import { MetadataElectron } from '@shukun/schema';

import { IntegerElectron } from './integer.electron';

describe('Integer Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: 'Integer',
        isRequired: true,
      };

      const field = new IntegerElectron(electron);
      const output = field.buildSqlSchema();
      expect(output).toEqual(`.bigInteger('mock')`);
    });
  });
});
