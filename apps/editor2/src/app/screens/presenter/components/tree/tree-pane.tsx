import { Box, ScrollArea, Text, createStyles } from '@mantine/core';
import { useObservableState } from 'observable-hooks';

import { HTML5DndProvider } from '../../../../components/dnd/dnd-provider';
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
  const selectedWidgetEntities = useObservableState(
    app.repositories.presenterRepository.widgetRepository
      .selectedWidgetEntities$,
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
        <HTML5DndProvider>
          <TreeDraggableNode
            treeNodes={treeNodes}
            widgetEntities={selectedWidgetEntities}
            treeCollapses={treeCollapses}
            selectedWidgetEntityId={selectedWidgetEntityId ?? undefined}
            sourceNodeId="root"
            selectedContainerEntityId={selectedContainerEntityId}
            level={0}
            index={0}
          />
        </HTML5DndProvider>
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
