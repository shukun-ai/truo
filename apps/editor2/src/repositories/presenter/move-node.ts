import { TypeException } from '@shukun/exception';
import { PresenterTreeNode, PresenterTreeNodes } from '@shukun/schema';
import { cloneDeep } from 'lodash';

export const moveToInside = (
  tree: PresenterTreeNodes,
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
  tree: PresenterTreeNodes,
  sourceNodeId: string,
  targetNodeId: string,
  position: 'before' | 'after',
) => {
  if (sourceNodeId === targetNodeId) {
    throw new TypeException('Did not support move source to same target.');
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

const getParentNode = (
  tree: PresenterTreeNodes,
  childNodeId: string,
): [string, PresenterTreeNode[]] => {
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
