import { MetadataElectron } from '@shukun/schema';

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
  });
});
