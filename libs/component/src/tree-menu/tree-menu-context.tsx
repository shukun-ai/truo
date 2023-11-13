import { ReactElement, createContext, useContext } from 'react';

import { TreeMenuKey, TreeMenuListBase } from './tree-menu-type';

export type TreeMenuContextProps<T> = {
  rootNodeKey: TreeMenuKey;
  moveToBeside?: (
    sourceKey: TreeMenuKey,
    targetKey: TreeMenuKey,
    position: 'before' | 'after',
  ) => void;
  moveToInside?: (sourceKey: TreeMenuKey, targetKey: TreeMenuKey) => void;
  removeNode?: (sourceKey: TreeMenuKey) => void;
  closeCollapse?: (sourceKey: TreeMenuKey) => void;
  openCollapse?: (sourceKey: TreeMenuKey) => void;
  clickNode?: (node: T) => void;
  addNode?: (
    type: 'sibling' | 'insert',
    targetKey: TreeMenuKey,
    node: T,
  ) => void;
  copyNode?: (targetKey: TreeMenuKey, node: T) => void;
  moreSection?: (props: { sourceNode: T; rootNodeKey: string }) => ReactElement;
};

export const TreeMenuContext = createContext<TreeMenuContextProps<any> | null>(
  null,
);

export const useTreeMenuContext = <
  T extends TreeMenuListBase,
>(): TreeMenuContextProps<T> => {
  const treeMenuContext = useContext(TreeMenuContext);

  if (!treeMenuContext) {
    throw new Error('The treeMenuContext is not initialize.');
  }
  return treeMenuContext;
};
