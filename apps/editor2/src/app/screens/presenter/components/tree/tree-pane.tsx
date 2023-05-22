import { useObservableState } from 'observable-hooks';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { activeNodeName$, collapseStore$, treeConfig$ } from './store';
import { TreeDraggableNode } from './tree-draggable-node';

export type TreePaneProps = {
  //
};

export const TreePane = () => {
  const treeConfig = useObservableState(treeConfig$);
  const collapseStore = useObservableState(collapseStore$);
  const activeNodeName = useObservableState(activeNodeName$);

  const DndProvider2 = DndProvider as any;

  return (
    <DndProvider2 backend={HTML5Backend}>
      <TreeDraggableNode
        treeConfig={treeConfig}
        collapseStore={collapseStore}
        activeNodeName={activeNodeName}
        currentNodeName="root"
        level={0}
        index={0}
      />
    </DndProvider2>
  );
};
