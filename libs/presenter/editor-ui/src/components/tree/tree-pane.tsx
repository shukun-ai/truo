import { Box, Divider, Title, createStyles } from '@mantine/core';
import { useObservableState } from 'observable-hooks';

import { useMemo } from 'react';

import { ScreenTip } from '../screen-tip/screen-tip';

import { TreeDraggableNode } from './internal/draggable-node';
import { TreeRootCreate } from './internal/root-create';
import { ScrollArea } from './internal/scroll-area';

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
    app.repositories.tabRepository.selectedWidgetEntityId$,
    null,
  );
  const widgetDefinitions = useObservableState(
    app.repositories.presenterRepository.widgetDefinitions$,
    {},
  );

  const onlyRoot = useMemo(() => {
    if (!treeNodes.root) {
      return true;
    }
    if (treeNodes.root.length === 0) {
      return true;
    }
    return false;
  }, [treeNodes.root]);

  return (
    <Box className={cx(classes.wrapper)}>
      <ScreenTip />
      <Title order={4} p={12}>
        查看组件
      </Title>
      <Divider />
      {selectedContainerEntityId ? (
        <ScrollArea>
          <TreeDraggableNode
            treeNodes={treeNodes}
            widgetEntities={selectedWidgetEntities}
            treeCollapses={treeCollapses}
            selectedWidgetEntityId={selectedWidgetEntityId ?? undefined}
            sourceNodeId="root"
            selectedContainerEntityId={selectedContainerEntityId}
            level={0}
            index={0}
            widgetDefinitions={widgetDefinitions}
          />
          {onlyRoot && <TreeRootCreate />}
        </ScrollArea>
      ) : (
        <NonContainerTip />
      )}
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
