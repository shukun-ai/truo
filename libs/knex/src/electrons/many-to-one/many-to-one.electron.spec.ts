import { MetadataElectronManyToOne } from '@shukun/schema';

import { ManyToOneElectron } from './many-to-one.electron';

describe('ManyToOne Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectronManyToOne = {
        name: 'mock',
        label: 'Mock',
        fieldType: 'ManyToOne',
        isRequired: true,
        referenceTo: 'mock_b',
        foreignName: 'mock_b_label',
      };

      const field = new ManyToOneElectron(electron);
      const output = field.buildSqlSchema();
      expect(output).toEqual(`.string('mock', 255)`);
    });
  });
});
