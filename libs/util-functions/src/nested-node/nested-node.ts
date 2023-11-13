import { TypeException } from '@shukun/exception';
import { cloneDeep } from 'lodash';

export const moveToInside = (
  tree: Record<string, string[]>,
  sourceNodeId: string,
  targetNodeId: string,
) => {
  if (sourceNodeId === targetNodeId) {
    throw new TypeException('Did not support move source to same target.');
  }

  const cloneTree = cloneDeep(tree);

  const [, sourceParentNode] = getParentNode(cloneTree, sourceNodeId);

  sourceParentNode.splice(sourceParentNode.indexOf(sourceNodeId), 1);

  const targetParentNode = cloneTree[targetNodeId];

  if (targetParentNode) {
    targetParentNode.push(sourceNodeId);
  } else {
    cloneTree[targetNodeId] = [sourceNodeId];
  }

  return cloneTree;
};

export const moveToBeside = (
  tree: Record<string, string[]>,
  sourceNodeId: string,
  targetNodeId: string,
  position: 'before' | 'after',
) => {
  if (sourceNodeId === targetNodeId) {
    return tree;
  }

  const cloneTree = cloneDeep(tree);

  const [, sourceParentNode] = getParentNode(cloneTree, sourceNodeId);

  sourceParentNode.splice(sourceParentNode.indexOf(sourceNodeId), 1);

  const [, targetParentNode] = getParentNode(cloneTree, targetNodeId);

  const changedIndex = position === 'after' ? 1 : 0;

  targetParentNode.splice(
    targetParentNode.indexOf(targetNodeId) + changedIndex,
    0,
    sourceNodeId,
  );

  return cloneTree;
};

export const removeNode = (
  tree: Record<string, string[]>,
  sourceNodeId: string,
): Record<string, string[]> => {
  let cloneTree = cloneDeep(tree);

  const sourceNode = cloneTree[sourceNodeId];

  // Remove children
  if (sourceNode) {
    cloneTree = sourceNode.reduce((previousTree, childNodeId) => {
      return removeNode(previousTree, childNodeId);
    }, cloneTree);
  }

  delete cloneTree[sourceNodeId];
  const [, sourceParentNode] = getParentNode(cloneTree, sourceNodeId);
  sourceParentNode.splice(sourceParentNode.indexOf(sourceNodeId), 1);
  return cloneTree;
};

export const addSiblingNode = (
  tree: Record<string, string[]>,
  newNodeId: string,
  targetNodeId: string,
) => {
  const cloneTree = cloneDeep(tree);
  cloneTree[newNodeId] = [];
  const [, targetParentNode] = getParentNode(cloneTree, targetNodeId);
  targetParentNode.splice(
    targetParentNode.indexOf(targetNodeId) + 1,
    0,
    newNodeId,
  );
  return cloneTree;
};

export const insertNode = (
  tree: Record<string, string[]>,
  newNodeId: string,
  targetNodeId: string,
) => {
  const cloneTree = cloneDeep(tree);
  const targetNode = getNodeOrCreate(cloneTree, targetNodeId);
  cloneTree[newNodeId] = [];
  targetNode.push(newNodeId);
  return cloneTree;
};

const getNodeOrCreate = (
  tree: Record<string, string[]>,
  nodeId: string,
): string[] => {
  const node = tree[nodeId];
  if (node) {
    return node;
  }
  tree[nodeId] = [];
  return tree[nodeId];
};

const getParentNode = (
  tree: Record<string, string[]>,
  childNodeId: string,
): [string, string[]] => {
  const entriesNode = Object.entries(tree).find(
    ([, node]) => node.indexOf(childNodeId) > -1,
  );

  if (!entriesNode) {
    throw new TypeException(
      'Did not find childNodeId in this tree: {{childNodeId}}',
      { childNodeId },
    );
  }

  const [nodeId, node] = entriesNode;

  return [nodeId, node];
};

export const closeCollapse = (
  collapses: Record<string, true>,
  sourceNodeKey: string,
): Record<string, true> => {
  return {
    ...collapses,
    [sourceNodeKey]: true,
  };
};

export const openCollapse = (
  collapses: Record<string, true>,
  sourceNodeKey: string,
): Record<string, true> => {
  const map = new Map(Object.entries(collapses));
  map.delete(sourceNodeKey);
  return Object.fromEntries(map);
};

export const select = closeCollapse;

export const unselect = openCollapse;

export const selectOnlyOne = (
  collapses: Record<string, true>,
  sourceNodeKey: string,
): Record<string, true> => {
  return {
    [sourceNodeKey]: true,
  };
};
