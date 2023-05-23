import { PresenterTreeNodes } from '@shukun/schema';

import { moveToBeside, moveToInside, removeNode } from './move-node';

describe('move-after-node', () => {
  describe('moveToBeside', () => {
    it('When move after sibling, return new tree.', () => {
      const tree: PresenterTreeNodes = {
        root: ['a', 'b', 'c'],
        a: ['a1', 'a2'],
        b: ['b1', 'b2'],
      };

      const newTree: PresenterTreeNodes = {
        root: ['a', 'b', 'c'],
        a: ['a2'],
        b: ['b1', 'a1', 'b2'],
      };

      expect(moveToBeside(tree, 'a1', 'b1', 'after')).toEqual(newTree);
    });

    it('When move before sibling, return new tree.', () => {
      const tree: PresenterTreeNodes = {
        root: ['a', 'b', 'c'],
        a: ['a1', 'a2'],
        b: ['b1', 'b2'],
      };

      const newTree: PresenterTreeNodes = {
        root: ['a', 'b', 'c'],
        a: ['a2'],
        b: ['a1', 'b1', 'b2'],
      };

      expect(moveToBeside(tree, 'a1', 'b1', 'before')).toEqual(newTree);
    });

    it('When move before sibling, return new tree.', () => {
      const tree: PresenterTreeNodes = {
        root: ['a', 'b', 'c'],
        a: ['a1', 'a2'],
        b: ['b1', 'b2'],
      };

      const newTree: PresenterTreeNodes = {
        root: ['a', 'b', 'c'],
        a: ['a1', 'a2'],
        b: ['b2', 'b1'],
      };

      expect(moveToBeside(tree, 'b2', 'b1', 'before')).toEqual(newTree);
    });

    it('When move from same position, throw error.', () => {
      const tree: PresenterTreeNodes = {
        root: ['a', 'b', 'c'],
        a: ['a1', 'a2'],
        b: ['b1', 'b2'],
      };

      const newTree: PresenterTreeNodes = {
        root: ['a', 'b', 'c'],
        a: ['a1', 'a2'],
        b: ['b1', 'b2'],
      };

      expect(moveToBeside(tree, 'a1', 'a1', 'after')).toEqual(newTree);
    });
  });

  describe('moveToInside', () => {
    it('When move a node into other node, return new tree.', () => {
      const tree: PresenterTreeNodes = {
        root: ['a', 'b', 'c'],
        a: ['a1', 'a2'],
        b: ['b1', 'b2'],
      };

      const newTree: PresenterTreeNodes = {
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
      const tree: PresenterTreeNodes = {
        root: ['a', 'b', 'c'],
        a: ['a1', 'a2'],
        b: ['b1', 'b2'],
        b1: ['b11', 'b12'],
      };

      const newTree: PresenterTreeNodes = {
        root: ['a', 'c'],
        a: ['a1', 'a2'],
      };

      expect(removeNode(tree, 'b')).toEqual(newTree);
    });
  });
});
