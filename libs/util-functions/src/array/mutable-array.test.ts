import {
  mutableAppend,
  mutableUpdate,
  mutableRemove,
  mutableMove,
} from './mutable-array';

describe('Name of the group', () => {
  describe('append', () => {
    it('should append', () => {
      const sets = [{ id: 'hello' }];
      mutableAppend(sets, { id: 'world' });
      expect(sets).toEqual([{ id: 'hello' }, { id: 'world' }]);
    });
  });

  describe('update', () => {
    it('should update', () => {
      const sets = [{ id: 'hello' }];
      mutableUpdate(sets, 0, { id: 'world' });
      expect(sets).toEqual([{ id: 'world' }]);
    });
  });

  describe('remove', () => {
    it('should remove', () => {
      const sets = [{ id: 'hello' }];
      mutableRemove(sets, 0);
      expect(sets).toEqual([]);
    });
  });

  describe('move', () => {
    it('should move from 2 to 4', () => {
      const sets = [
        'raw',
        'bound',
        'synced',
        'published',
        'accepted',
        'executed',
      ];
      mutableMove(sets, 2, 4);
      expect(sets).toEqual([
        'raw',
        'bound',
        'published',
        'accepted',
        'synced',
        'executed',
      ]);
    });

    it('should move from 4 to 2', () => {
      const sets = [
        'raw',
        'bound',
        'synced',
        'published',
        'accepted',
        'executed',
      ];
      mutableMove(sets, 4, 2);
      expect(sets).toEqual([
        'raw',
        'bound',
        'synced',
        'accepted',
        'published',
        'executed',
      ]);
    });
  });
});
