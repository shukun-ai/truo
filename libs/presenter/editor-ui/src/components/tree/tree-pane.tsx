import { Box, Divider, Title, createStyles } from '@mantine/core';

import { useMemo } from 'react';

import { useEditorContext } from '../../editor-context';

import { extractTabForeignId } from '../../helpers/extract-tab-foreign-id';

import { TreeDraggableNode } from './internal/draggable-node';
import { TreeRootCreate } from './internal/root-create';
import { ScrollArea } from './internal/scroll-area';

export type TreePaneProps = {
  //
};

export const TreePane = () => {
  const { classes, cx } = useStyles();

  const { state } = useEditorContext();

  const {
    nodes,
    widgets,
    nodeCollapses,
    selectedTab,
    widgetDefinitions,
    widgetGallery,
    rootNodeId,
  } = state;

  const onlyRoot = useMemo(() => {
    if (!nodes.root) {
      return true;
    } else {
      return false;
    }
  }, [nodes.root]);

  return (
    <Box className={cx(classes.wrapper)}>
      <Title order={4} p={12}>
        查看组件
      </Title>
      <Divider />
      <ScrollArea>
        <TreeDraggableNode
          treeNodes={nodes}
          widgetEntities={widgets}
          treeCollapses={nodeCollapses}
          selectedWidgetEntityId={
            extractTabForeignId(selectedTab, 'widget') ?? undefined
          }
          sourceNodeId={rootNodeId}
          level={0}
          index={0}
          widgetDefinitions={widgetDefinitions}
          widgetGallery={widgetGallery}
          parentWidgetDefinition={null}
        />
        {/* Please remove false if you want to enable this feature, but remember to update TreeRootCreate allowChildTags for root widget. */}
        {onlyRoot && false && <TreeRootCreate />}
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
