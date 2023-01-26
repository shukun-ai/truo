import { MetadataElectron } from '@shukun/schema';

import { AttachmentElectron } from './attachment.electron';

describe('Attachment Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: 'Attachment',
        isRequired: true,
      };

      const field = new AttachmentElectron(electron);
      const output = field.buildSqlSchema();
      expect(output).toEqual(`.json('mock')`);
    });
  });
});
