import { DraggableNode } from './internal/draggable-node';
import { TreeMenuContext, TreeMenuContextProps } from './tree-menu-context';
import {
  TreeMenuCollapses,
  TreeMenuList,
  TreeMenuListBase,
  TreeMenuSelections,
  TreeMenuStructure,
} from './tree-menu-type';

export type TreeMenuProps<T extends TreeMenuListBase> = {
  list: TreeMenuList<T>;
  structure: TreeMenuStructure;
  collapses: TreeMenuCollapses;
  selections: TreeMenuSelections;
} & TreeMenuContextProps<T>;

export const TreeMenu = <T extends TreeMenuListBase>(
  props: TreeMenuProps<T>,
) => {
  return (
    <TreeMenuContext.Provider value={props}>
      <DraggableNode
        list={props.list}
        structure={props.structure}
        collapses={props.collapses}
        selections={props.selections}
        sourceKey={props.rootNodeKey}
        level={0}
        index={0}
      />
    </TreeMenuContext.Provider>
  );
};
