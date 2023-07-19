import { getUniqueLabel } from './unique-label';

describe('unique-label', () => {
  describe('getUniqueLabel', () => {
    it('get first unique label', () => {
      const output = getUniqueLabel('untitle', []);
      expect(output).toEqual('untitle');
    });

    it('get next unique label', () => {
      const output = getUniqueLabel('untitle', [
        'untitle',
        'untitle1',
        'untitle2',
        'untitle2222',
        'xxxx',
      ]);
      expect(output).toEqual('untitle3');
    });
  });
});
