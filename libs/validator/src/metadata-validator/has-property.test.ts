import { MetadataElectron } from '@shukun/schema';

import { hasProperty } from './has-property';

describe('has-property', () => {
  describe('hasProperty', () => {
    it('should ', () => {
      const electron: MetadataElectron = {
        fieldType: 'Owner',
        name: 'owner',
        label: 'owner',
        isRequired: false,
        description: 'Description messages',
      };
      const output = hasProperty(electron, {
        fieldType: 'Owner',
        name: 'owner',
        label: 'owner',
        isRequired: false,
      });
      expect(output).toEqual(true);
    });

    it('should throw Error', () => {
      const electron: MetadataElectron = {
        fieldType: 'Owner',
        name: 'owner',
        label: 'owner',
        isRequired: false,
      };
      expect(() =>
        hasProperty(electron, {
          fieldType: 'Owner',
          name: 'owner',
          label: 'owner',
          isRequired: false,
          description: 'Description messages',
        }),
      ).toThrow();
    });
  });
});
