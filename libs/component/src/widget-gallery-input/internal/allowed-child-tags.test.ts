import { getDisabledByTags } from './allowed-child-tags';

describe('allowed-child-tags', () => {
  describe('getDisabledByTags', () => {
    it('should ', () => {
      expect(getDisabledByTags([], 'table-column')).toEqual(true);
    });

    it('should ', () => {
      expect(getDisabledByTags(['table'], 'table-column')).toEqual(true);
    });

    it('should ', () => {
      expect(getDisabledByTags(['*'], 'table-column')).toEqual(false);
    });

    it('should ', () => {
      expect(getDisabledByTags(['table-column'], 'table-column')).toEqual(
        false,
      );
    });
  });
});
