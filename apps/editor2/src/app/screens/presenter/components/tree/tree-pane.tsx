import { Box, ScrollArea, Text, createStyles } from '@mantine/core';
import { useObservableState } from 'observable-hooks';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useAppContext } from '../../../../contexts/app-context';

import { TreeDraggableNode } from './tree-draggable-node';

export type TreePaneProps = {
  //
};

export const TreePane = () => {
  const { classes, cx } = useStyles();
  const app = useAppContext();
  const treeNodes = useObservableState(
    app.repositories.presenterRepository.treeRepository.selectedTreeNodes$,
    {},
  );
  const selectedWidgets = useObservableState(
    app.repositories.presenterRepository.widgetRepository.selectedWidgets$,
    {},
  );
  const selectedContainerEntityId = useObservableState(
    app.repositories.presenterRepository.selectedContainerEntityId$,
    null,
  );
  const treeCollapses = useObservableState(
    app.repositories.presenterRepository.treeRepository.selectedTreeCollapses$,
    {},
  );
  const selectedWidgetEntityId = useObservableState(
    app.repositories.presenterRepository.selectedWidgetEntityId$,
    null,
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DndProvider2 = DndProvider as any;

  if (!selectedContainerEntityId) {
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
            selectedWidgetEntityId={selectedWidgetEntityId ?? undefined}
            sourceNodeId="root"
            selectedContainerEntityId={selectedContainerEntityId}
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
