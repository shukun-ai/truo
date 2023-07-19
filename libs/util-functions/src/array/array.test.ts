import { append, move, remove, update } from './array';

describe('Name of the group', () => {
  describe('append', () => {
    it('should append', () => {
      const sets = [{ id: 'hello' }];
      const output = append(sets, { id: 'world' });
      expect(output).toEqual([{ id: 'hello' }, { id: 'world' }]);
      expect(sets).toEqual([{ id: 'hello' }]);
    });
  });

  describe('update', () => {
    it('should update', () => {
      const sets = [{ id: 'hello' }];
      const output = update(sets, 0, { id: 'world' });
      expect(output).toEqual([{ id: 'world' }]);
      expect(sets).toEqual([{ id: 'hello' }]);
    });
  });

  describe('remove', () => {
    it('should remove', () => {
      const sets = [{ id: 'hello' }];
      const output = remove(sets, 0);
      expect(output).toEqual([]);
      expect(sets).toEqual([{ id: 'hello' }]);
    });
  });

  describe('move', () => {
    it('should move from 0 to 1', () => {
      const sets = ['x', 1, 2, 3, 4, 5, 6];
      const output = move(sets, 0, 1);
      expect(output).toEqual([1, 'x', 2, 3, 4, 5, 6]);
      expect(sets).toEqual(['x', 1, 2, 3, 4, 5, 6]);
    });

    it('should move to back', () => {
      const sets = [1, 'x', 2, 3, 4, 5, 6];
      const output = move(sets, 1, 2);
      expect(output).toEqual([1, 2, 'x', 3, 4, 5, 6]);
      expect(sets).toEqual([1, 'x', 2, 3, 4, 5, 6]);
    });

    it('should move to back', () => {
      const sets = [1, 2, 3, 4, 5, 6, 'x'];
      const output = move(sets, 6, 5);
      expect(output).toEqual([1, 2, 3, 4, 5, 'x', 6]);
      expect(sets).toEqual([1, 2, 3, 4, 5, 6, 'x']);
    });

    it('should move to back', () => {
      const sets = [1, 2, 3, 4, 5, 6, 'x'];
      const output = move(sets, 6, 0);
      expect(output).toEqual(['x', 1, 2, 3, 4, 5, 6]);
      expect(sets).toEqual([1, 2, 3, 4, 5, 6, 'x']);
    });
  });
});
