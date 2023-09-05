import { arrayPathToString, stringPathToArray } from './json-path';

describe('json-path', () => {
  describe('arrayPathToString', () => {
    it('should ', () => {
      expect(arrayPathToString(['a', 'b', 'c'])).toEqual('a.b.c');
    });

    it('should ', () => {
      expect(arrayPathToString([], '$.user')).toEqual('$.user');
    });

    it('should ', () => {
      expect(arrayPathToString([], '$')).toEqual('$');
    });

    it('should ', () => {
      expect(arrayPathToString(['a', 'b', 'c'], '$.user')).toEqual(
        '$.user.a.b.c',
      );
    });

    it('should ', () => {
      expect(arrayPathToString(['a', 'b', 'c'], '$')).toEqual('$.a.b.c');
    });
  });

  describe('stringPathToArray', () => {
    it('should ', () => {
      expect(stringPathToArray('a.b.c')).toEqual(['a', 'b', 'c']);
    });

    it('should ', () => {
      expect(stringPathToArray('$.user', '$.user')).toEqual([]);
    });

    it('should ', () => {
      expect(stringPathToArray('$', '$')).toEqual([]);
    });

    it('should ', () => {
      expect(stringPathToArray('$.user.a.b.c', '$.user')).toEqual([
        'a',
        'b',
        'c',
      ]);
    });

    it('should ', () => {
      expect(stringPathToArray('$.user.a.b.c', '$')).toEqual([
        'user',
        'a',
        'b',
        'c',
      ]);
    });
  });
});
