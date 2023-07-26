import { Box, Divider, Title, createStyles } from '@mantine/core';
import { useObservableState } from 'observable-hooks';

import { useMemo } from 'react';

import { useAppContext } from '../../../../contexts/app-context';

import { ScreenTip } from '../screen-tip/screen-tip';

import { TreeDraggableNode } from './internal/draggable-node';
import { EmptyTip } from './internal/empty-tip';
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
      {/* <ScrollArea sx={{ flex: 1, overflow: 'hidden' }}> */}
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
          />
          {onlyRoot && <TreeRootCreate />}
        </ScrollArea>
      ) : (
        <EmptyTip />
      )}
      {/* </ScrollArea> */}
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
