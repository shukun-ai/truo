import { append, move, remove, update } from './array-inputs-helper';

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
    it('should move to front', () => {
      const sets = [{ id: 'hello' }, { id: 'world' }];
      const output = move(sets, 1, 0);
      expect(output).toEqual([{ id: 'world' }, { id: 'hello' }]);
      expect(sets).toEqual([{ id: 'hello' }, { id: 'world' }]);
    });

    it('should move to back', () => {
      const sets = [1, 'x', 3, 4, 5, 6];
      const output = move(sets, 1, 5);
      expect(output).toEqual([1, 3, 4, 5, 'x', 6]);
      expect(sets).toEqual([1, 'x', 3, 4, 5, 6]);
    });
  });
});
