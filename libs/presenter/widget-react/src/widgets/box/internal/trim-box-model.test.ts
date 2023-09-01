import { trimBoxModel } from './trim-box-model';

describe('trim-box-model', () => {
  describe('trim-box-model', () => {
    it('should return trim', () => {
      expect(trimBoxModel({ w: '' })).toEqual({ w: undefined });
    });

    it('should return regular value', () => {
      expect(trimBoxModel({ w: '100px' })).toEqual({ w: '100px' });
    });
  });
});
