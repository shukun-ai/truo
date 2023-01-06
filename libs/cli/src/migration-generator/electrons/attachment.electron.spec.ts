import { MetadataElectron, MetadataFieldType } from '@shukun/schema';

import { AttachmentElectron } from './attachment.electron';

describe('Attachment Electron', () => {
  describe('buildSqlSchema', () => {
    it('Should show default length.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.Attachment,
        isRequired: true,
      };

      const field = new AttachmentElectron();
      const output = field.buildSqlSchema(electron);
      expect(output).toEqual(`.json('mock')`);
    });
  });
});
