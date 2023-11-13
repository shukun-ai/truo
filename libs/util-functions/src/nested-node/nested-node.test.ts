import {
  insertNode,
  moveToBeside,
  moveToInside,
  removeNode,
} from './nested-node';

describe('move-after-node', () => {
  describe('moveToBeside', () => {
    it('When move after sibling, return new tree.', () => {
      const tree: Record<string, string[]> = {
        root: ['a', 'b', 'c'],
        a: ['a1', 'a2'],
        b: ['b1', 'b2'],
      };

      const newTree: Record<string, string[]> = {
        root: ['a', 'b', 'c'],
        a: ['a2'],
        b: ['b1', 'a1', 'b2'],
      };

      expect(moveToBeside(tree, 'a1', 'b1', 'after')).toEqual(newTree);
    });

    it('When move before sibling, return new tree.', () => {
      const tree: Record<string, string[]> = {
        root: ['a', 'b', 'c'],
        a: ['a1', 'a2'],
        b: ['b1', 'b2'],
      };

      const newTree: Record<string, string[]> = {
        root: ['a', 'b', 'c'],
        a: ['a2'],
        b: ['a1', 'b1', 'b2'],
      };

      expect(moveToBeside(tree, 'a1', 'b1', 'before')).toEqual(newTree);
    });

    it('When move before sibling, return new tree.', () => {
      const tree: Record<string, string[]> = {
        root: ['a', 'b', 'c'],
        a: ['a1', 'a2'],
        b: ['b1', 'b2'],
      };

      const newTree: Record<string, string[]> = {
        root: ['a', 'b', 'c'],
        a: ['a1', 'a2'],
        b: ['b2', 'b1'],
      };

      expect(moveToBeside(tree, 'b2', 'b1', 'before')).toEqual(newTree);
    });

    it('When move from same position, throw error.', () => {
      const tree: Record<string, string[]> = {
        root: ['a', 'b', 'c'],
        a: ['a1', 'a2'],
        b: ['b1', 'b2'],
      };

      const newTree: Record<string, string[]> = {
        root: ['a', 'b', 'c'],
        a: ['a1', 'a2'],
        b: ['b1', 'b2'],
      };

      expect(moveToBeside(tree, 'a1', 'a1', 'after')).toEqual(newTree);
    });
  });

  describe('moveToInside', () => {
    it('When move a node into other node, return new tree.', () => {
      const tree: Record<string, string[]> = {
        root: ['a', 'b', 'c'],
        a: ['a1', 'a2'],
        b: ['b1', 'b2'],
      };

      const newTree: Record<string, string[]> = {
        root: ['a', 'b', 'c'],
        a: ['a2'],
        b: ['b1', 'b2'],
        b2: ['a1'],
      };

      expect(moveToInside(tree, 'a1', 'b2')).toEqual(newTree);
    });
  });

  describe('removeNode', () => {
    it('When remove a node, return new tree.', () => {
      const tree: Record<string, string[]> = {
        root: ['a', 'b', 'c'],
        a: ['a1', 'a2'],
        b: ['b1', 'b2'],
        b1: ['b11', 'b12'],
      };

      const newTree: Record<string, string[]> = {
        root: ['a', 'c'],
        a: ['a1', 'a2'],
      };

      expect(removeNode(tree, 'b')).toEqual(newTree);
    });
  });

  describe('insertNode', () => {
    it('When insert a node, return new tree.', () => {
      const tree: Record<string, string[]> = {
        root: ['a'],
        a: ['a1', 'a2'],
      };

      const newTree: Record<string, string[]> = {
        root: ['a', 'b'],
        a: ['a1', 'a2'],
        b: [],
      };

      expect(insertNode(tree, 'b', 'root')).toEqual(newTree);
    });

    it('When insert a empty node, return new tree.', () => {
      const tree: Record<string, string[]> = {};

      const newTree: Record<string, string[]> = {
        root: ['b'],
        b: [],
      };

      expect(insertNode(tree, 'b', 'root')).toEqual(newTree);
    });
  });
});
