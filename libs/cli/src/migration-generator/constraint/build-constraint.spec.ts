import { MetadataElectron, MetadataFieldType } from '@shukun/schema';

import { buildUnique, buildRequired, buildIndexed } from './build-constraint';

describe('build-constraint', () => {
  describe('buildUnique', () => {
    it('Normal buildUnique', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.Text,
        isUnique: true,
        isRequired: true,
      };

      const output = buildUnique(electron);
      expect(output).toEqual('.unique()');
    });

    it('Throw error when isUnique is true and isRequired is false.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.Text,
        isUnique: true,
        isRequired: false,
      };

      expect(() => buildUnique(electron)).toThrow(
        new Error(
          'When the isUnique set as true, the isRequired and isIndexed must be set as true.',
        ),
      );
    });

    it('Throw error when isUnique is true and isIndexed is true.', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.Text,
        isUnique: true,
        isRequired: true,
        isIndexed: true,
      };

      expect(() => buildUnique(electron)).toThrow(
        new Error(
          'When the isUnique set as true, the isIndexed must be set as false.',
        ),
      );
    });
  });

  describe('buildRequired', () => {
    it('When isRequired is true, and set notNullable()', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.Text,
        isRequired: true,
      };

      const output = buildRequired(electron);
      expect(output).toEqual('.notNullable()');
    });

    it('When isRequired is false, and set nullable()', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.Text,
        isRequired: false,
      };

      const output = buildRequired(electron);
      expect(output).toEqual('.nullable()');
    });

    it('When isIndexed is true, and set index()', () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.Text,
        isRequired: true,
        isIndexed: true,
      };

      const output = buildIndexed(electron);
      expect(output).toEqual('.index()');
    });

    it("When isIndexed is false, and set ''", () => {
      const electron: MetadataElectron = {
        name: 'mock',
        label: 'Mock',
        fieldType: MetadataFieldType.Text,
        isRequired: true,
        isIndexed: false,
      };

      const output = buildIndexed(electron);
      expect(output).toEqual('');
    });
  });
});
