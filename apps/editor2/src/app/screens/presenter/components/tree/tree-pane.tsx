import { Box, ScrollArea, Text, createStyles } from '@mantine/core';
import { useObservableState } from 'observable-hooks';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useAppContext } from '../../../../contexts/app-context';

import { activeNodeName$ } from './store';
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
  const selectedWidgets = useObservableState(
    app.repositories.presenterRepository.selectedWidgets$,
    {},
  );
  const selectedContainerId = useObservableState(
    app.repositories.presenterRepository.selectedContainerId$,
    null,
  );
  const treeCollapses = useObservableState(
    app.repositories.presenterRepository.selectedTreeCollapses$,
    {},
  );
  const activeNodeName = useObservableState(activeNodeName$);

  const DndProvider2 = DndProvider as any;

  if (!selectedContainerId) {
    return (
      <Box className={cx(classes.wrapper)}>
        <Text>请先选择容器</Text>
      </Box>
    );
  }

  return (
    <Box className={cx(classes.wrapper)}>
      <ScrollArea sx={{ flex: 1, overflow: 'hidden' }}>
        <DndProvider2 backend={HTML5Backend}>
          <TreeDraggableNode
            treeNodes={treeNodes}
            widgets={selectedWidgets}
            treeCollapses={treeCollapses}
            activeNodeName={activeNodeName}
            sourceNodeId="root"
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
