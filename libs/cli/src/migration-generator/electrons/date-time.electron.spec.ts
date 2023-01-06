import { MetadataElectron, MetadataFieldType } from '@shukun/schema';

import { DateTimeElectron } from './date-time.electron';

describe('DateTime Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show timestamp.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.DateTime,
        isRequired: true,
      };

      const field = new DateTimeElectron();
      const output = field.buildSqlSchema(electron);
      expect(output).toEqual(`.timestamp('mock')`);
    });
  });
});
