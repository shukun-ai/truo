import { FlatMetadataSchema } from '../flat-metadata/flat-metadata.type';

import { Differ } from './differ';
import { DiffResult } from './differ.type';
describe('Differ', () => {
  describe('detail', () => {
    it('should return all added, then left is empty, right is a new', () => {
      const left: FlatMetadataSchema = {};
      const right: FlatMetadataSchema = {
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

      const differences = new Differ(left, right).getDetail();

      const expected: DiffResult = {
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
      const left: FlatMetadataSchema = {
        devices: {
          number: {
            name: 'number',
            label: 'number',
            fieldType: 'Text',
            isRequired: true,
          },
        },
      };
      const right: FlatMetadataSchema = {
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

      const differences = new Differ(left, right).getDetail();

      const expected: DiffResult = {
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
      const left: FlatMetadataSchema = {
        devices: {
          number: {
            name: 'number',
            label: 'number',
            fieldType: 'Text',
            isRequired: true,
          },
        },
      };
      const right: FlatMetadataSchema = {
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

      const differences = new Differ(left, right).getDetail();

      const expected: DiffResult = {
        added: { devices: { number: { options: [] } } },
        deleted: {},
        updated: { devices: { number: { fieldType: 'SingleSelect' } } },
      };
      expect(differences).toEqual(expected);
    });
  });

  describe('getLeft', () => {
    it('should return left specific value.', () => {
      const left: FlatMetadataSchema = {
        devices: {
          number: {
            name: 'number',
            label: 'number',
            fieldType: 'Text',
            isRequired: true,
          },
        },
      };

      const value = new Differ(left, {}).seekLeftElectron('devices', 'number');
      expect(value).toEqual({
        name: 'number',
        label: 'number',
        fieldType: 'Text',
        isRequired: true,
      });
    });
  });
});
