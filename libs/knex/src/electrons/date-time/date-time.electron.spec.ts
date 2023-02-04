import { MetadataElectron } from '@shukun/schema';

import { DateTimeElectron } from './date-time.electron';

describe('DateTime Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show timestamp.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: 'DateTime',
        isRequired: true,
      };

      const field = new DateTimeElectron(electron);
      const output = field.buildSqlSchema();
      expect(output).toEqual(`.timestamp('mock')`);
    });
  });
});
