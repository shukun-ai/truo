import { MigrationDifference, MigrationMetadataMap } from '@shukun/schema';

import { MetadataDiffer } from './metadata-differ';

describe('Differ', () => {
  describe('detail', () => {
    it('should return all added, then left is empty, right is a new', () => {
      const left: MigrationMetadataMap = {};
      const right: MigrationMetadataMap = {
        devices: {
          number: {
            name: 'number',
            label: 'number',
            fieldType: 'Text',
            isRequired: true,
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
      };

      const differences = new MetadataDiffer().getDetail(left, right);

      const expected: MigrationDifference = {
        added: {
          airports: {
            code: {
              fieldType: 'Text',
              isRequired: true,
              label: 'code',
              name: 'code',
            },
          },
          devices: {
            number: {
              fieldType: 'Text',
              isRequired: true,
              label: 'number',
              name: 'number',
            },
          },
        },
        deleted: {},
        updated: {},
      };
      expect(differences).toEqual(expected);
    });

    it('should return added isIndexed.', () => {
      const left: MigrationMetadataMap = {
        devices: {
          number: {
            name: 'number',
            label: 'number',
            fieldType: 'Text',
            isRequired: true,
          },
        },
      };
      const right: MigrationMetadataMap = {
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
      };

      const differences = new MetadataDiffer().getDetail(left, right);

      const expected: MigrationDifference = {
        added: {
          airports: {
            code: {
              fieldType: 'Text',
              isRequired: true,
              label: 'code',
              name: 'code',
            },
          },
          devices: { number: { isIndexed: true } },
        },
        deleted: {},
        updated: {},
      };
      expect(differences).toEqual(expected);
    });

    it('should return updated fieldType.', () => {
      const left: MigrationMetadataMap = {
        devices: {
          number: {
            name: 'number',
            label: 'number',
            fieldType: 'Text',
            isRequired: true,
          },
        },
      };
      const right: MigrationMetadataMap = {
        devices: {
          number: {
            name: 'number',
            label: 'number',
            fieldType: 'SingleSelect',
            isRequired: true,
            options: [],
          },
        },
      };

      const differences = new MetadataDiffer().getDetail(left, right);

      const expected: MigrationDifference = {
        added: { devices: { number: { options: [] } } },
        deleted: {},
        updated: { devices: { number: { fieldType: 'SingleSelect' } } },
      };
      expect(differences).toEqual(expected);
    });
  });
});
