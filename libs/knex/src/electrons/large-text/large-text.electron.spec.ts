import { MetadataElectron } from '@shukun/schema';

import { LargeTextElectron } from './large-text.electron';

describe('LargeText Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: 'LargeText',
        isRequired: true,
      };

      const field = new LargeTextElectron(electron);
      const output = field.buildSqlSchema();
      expect(output).toEqual(`.text('mock')`);
    });
  });
});
