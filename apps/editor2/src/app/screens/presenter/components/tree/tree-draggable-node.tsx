import { Box, createStyles } from '@mantine/core';
import { PresenterTreeNodes, PresenterWidgets } from '@shukun/schema';
import { useMemo } from 'react';
import { useDrag } from 'react-dnd';

import { PresenterTreeCollapse } from '../../../../../repositories/presenter/tree-ui-ref';

import { LEFT_INDENT_WIDTH, TREE_NODE_TYPE } from './store';
import { TreeArrow } from './tree-arrow';
import { TreeDroppableDivider } from './tree-droppable-divider';
import { TreeDroppableLabel } from './tree-droppable-label';
import { TreeDroppableItem } from './tree-droppable-type';
import { TreeMoreButton } from './tree-more-button';

export const TreeDraggableNode = ({
  treeNodes,
  widgets,
  treeCollapses,
  sourceNodeId,
  level,
  index,
  activeNodeName,
}: {
  treeNodes: PresenterTreeNodes;
  widgets: PresenterWidgets;
  treeCollapses: Record<string, PresenterTreeCollapse>;
  sourceNodeId: string;
  level: number;
  index: number;
  activeNodeName?: string;
}) => {
  const [, drag] = useDrag<TreeDroppableItem>(() => ({
    type: TREE_NODE_TYPE,
    item: { sourceNodeId: sourceNodeId },
  }));

  const isOpen = useMemo(() => {
    const collapse = treeCollapses[sourceNodeId];
    return !collapse;
  }, [treeCollapses, sourceNodeId]);

  const { classes } = useStyles();

  const widget = useMemo(() => {
    return widgets[sourceNodeId];
  }, [sourceNodeId, widgets]);

  return (
    <Box ref={drag} className={classes.draggableItem}>
      {index === 0 && (
        <TreeDroppableDivider
          targetNodeId={sourceNodeId}
          position="before"
          level={level}
        />
      )}
      <Box className={classes.nodeItem}>
        <Box style={{ width: LEFT_INDENT_WIDTH * level }}></Box>
        <TreeArrow
          isOpen={isOpen}
          sourceNodeId={sourceNodeId}
          treeNodes={treeNodes}
        />
        <Box style={{ flex: 1 }}>
          <TreeDroppableLabel
            targetNodeId={sourceNodeId}
            title={widget?.title}
            tag={widget?.tag}
          />
        </Box>
        <Box sx={{ paddingRight: 6 }}>
          <TreeMoreButton sourceNodeId={sourceNodeId} />
        </Box>
      </Box>
      {isOpen && (
        <List>
          {treeNodes[sourceNodeId]?.map((childNode, index) => (
            <TreeDraggableNode
              key={childNode}
              treeNodes={treeNodes}
              widgets={widgets}
              treeCollapses={treeCollapses}
              activeNodeName={activeNodeName}
              sourceNodeId={childNode}
              level={level + 1}
              index={index}
            />
          ))}
        </List>
      )}
      <TreeDroppableDivider
        targetNodeId={sourceNodeId}
        position="after"
        level={level}
      />
    </Box>
  );
};

const List = ({ children }: { children: JSX.Element[] }) => {
  return <Box>{children}</Box>;
};

const useStyles = createStyles((theme) => ({
  selected: {
    background: theme.colors.blue[8],
    color: theme.white,
  },
  draggableItem: {
    cursor: 'pointer',
  },
  nodeItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.colors.blue[8],

    '&:hover': {
      background: theme.colors.blue[1],
    },
  },
}));
