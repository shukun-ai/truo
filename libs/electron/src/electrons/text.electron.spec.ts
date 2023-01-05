import { MetadataElectron, MetadataFieldType } from '@shukun/schema';

import { TextElectron } from './text.electron';

describe('text', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.Text,
        isRequired: true,
      };

      const field = new TextElectron();
      const output = field.buildSqlSchema(electron);
      expect(output).toEqual(`.string('mock', 1000)`);
    });
  });

  describe('validateValue', () => {
    it('When value is string.', () => {
      const value = 'Hello';
      const field = new TextElectron();
      const output = field.validateValue(value);
      expect(output).toEqual([]);
    });

    describe('When value is too long string, will throw error.', () => {
      const value = new Array(200)
        .fill(1)
        .reduce((previous) => (previous += 'Hello'), 's');
      const field = new TextElectron();
      const output = field.validateValue(value);
      expect(output).toEqual(['The allowed max value is 1000.']);
    });
  });
});
