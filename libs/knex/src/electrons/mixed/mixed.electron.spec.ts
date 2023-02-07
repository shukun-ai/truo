import { MetadataElectron } from '@shukun/schema';

import { MixedElectron } from './mixed.electron';

describe('Mixed Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: 'Mixed',
        isRequired: true,
      };

      const field = new MixedElectron(electron);
      const output = field.buildSqlSchema();
      expect(output).toEqual(`.json('mock')`);
    });
  });
});
