import { firstOrNull, lastOrNull } from './source-helper';

describe('source-helper', () => {
  describe('firstOrNull', () => {
    it('if input has elements, then return first.', () => {
      const input = [1, 2, 3];
      expect(firstOrNull(input)).toEqual(1);
    });

    it('if input does not have elements, then return null.', () => {
      const input: number[] = [];
      expect(firstOrNull(input)).toEqual(null);
    });

    it('if input has elements, then return last.', () => {
      const input = [1, 2, 3];
      expect(lastOrNull(input)).toEqual(3);
    });

    it('if input does not have elements, then return null.', () => {
      const input: number[] = [];
      expect(lastOrNull(input)).toEqual(null);
    });
  });
});
