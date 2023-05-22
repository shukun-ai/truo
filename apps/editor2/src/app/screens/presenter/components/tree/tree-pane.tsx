import { Box, ScrollArea, createStyles } from '@mantine/core';
import { useObservableState } from 'observable-hooks';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useAppContext } from '../../../../contexts/app-context';

import { activeNodeName$, collapseStore$ } from './store';
import { TreeDraggableNode } from './tree-draggable-node';

export type TreePaneProps = {
  //
};

export const TreePane = () => {
  const { classes, cx } = useStyles();
  const app = useAppContext();
  const treeNodes = useObservableState(
    app.repositories.presenterRepository.selectedTreeNodes$,
    {},
  );
  const collapseStore = useObservableState(collapseStore$);
  const activeNodeName = useObservableState(activeNodeName$);

  const DndProvider2 = DndProvider as any;

  return (
    <Box className={cx(classes.wrapper)}>
      <ScrollArea sx={{ flex: 1, overflow: 'hidden' }}>
        <DndProvider2 backend={HTML5Backend}>
          <TreeDraggableNode
            treeNodes={treeNodes}
            collapseStore={collapseStore}
            activeNodeName={activeNodeName}
            currentNodeName="root"
            level={0}
            index={0}
          />
        </DndProvider2>
      </ScrollArea>
    </Box>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: '100%',
  },
}));
