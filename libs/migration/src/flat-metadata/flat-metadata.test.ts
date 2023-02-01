import { MetadataSchema } from '@shukun/schema';

import { FlatMetadata } from './flat-metadata';

describe('FlatMetadata', () => {
  describe('flatten', () => {
    it('should return flat metadata', () => {
      const metadata: MetadataSchema[] = [
        {
          name: 'devices',
          label: 'devices',
          electrons: [
            {
              name: 'number',
              label: 'number',
              fieldType: 'Text',
              isRequired: true,
              isIndexed: true,
            },
          ],
        },
        {
          name: 'airports',
          label: 'airports',
          electrons: [
            {
              name: 'code',
              label: 'code',
              fieldType: 'Text',
              isRequired: true,
            },
          ],
        },
      ];

      const flat = new FlatMetadata().flatten(metadata);

      expect(flat).toEqual({
        devices: {
          number: {
            name: 'number',
            label: 'number',
            fieldType: 'Text',
            isRequired: true,
            isIndexed: true,
          },
        },
        airports: {
          code: {
            name: 'code',
            label: 'code',
            fieldType: 'Text',
            isRequired: true,
          },
        },
      });
    });
  });
});
