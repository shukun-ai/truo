import { Alert, Box, ScrollArea, createStyles } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useObservableState } from 'observable-hooks';

import { useMemo } from 'react';

import { useAppContext } from '../../../../contexts/app-context';

import { TreeDraggableNode } from './tree-draggable-node';
import { TreeRootCreate } from './tree-root-create';

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

  if (!selectedContainerEntityId) {
    return (
      <Box className={cx(classes.wrapper)}>
        <Alert icon={<IconInfoCircle />} title="请先选择容器">
          在上方选择或者创建新的容器，然后操作相关的组件树。
          <br />
          一个容器有多条组件树、数据仓库、观察器组成。
        </Alert>
      </Box>
    );
  }

  return (
    <Box className={cx(classes.wrapper)}>
      <ScrollArea sx={{ flex: 1, overflow: 'hidden' }}>
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
