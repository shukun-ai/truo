import { Box, createStyles } from '@mantine/core';
import { PresenterNode, WidgetSchema } from '@shukun/schema';
import { useMemo } from 'react';
import { useDrag } from 'react-dnd';

import {
  NodeCollapseEntity,
  WidgetEntity,
  useEditorContext,
} from '../../../editor-context';

import { TreeArrow } from './arrow';
import {
  LEFT_INDENT_WIDTH,
  TREE_NODE_TYPE,
  TreeDroppableItem,
} from './constants';
import { TreeDroppableDivider } from './droppable-divider';
import { TreeDroppableLabel } from './droppable-label';
import { TreeMoreButton } from './more-button';

export const TreeDraggableNode = ({
  treeNodes,
  widgetEntities,
  treeCollapses,
  sourceNodeId,
  level,
  index,
  selectedWidgetEntityId,
  widgetDefinitions,
}: {
  treeNodes: Record<string, PresenterNode>;
  widgetEntities: Record<string, WidgetEntity>;
  treeCollapses: Record<string, NodeCollapseEntity>;
  sourceNodeId: string;
  level: number;
  index: number;
  selectedWidgetEntityId?: string;
  widgetDefinitions: Record<string, WidgetSchema>;
}) => {
  const { state, dispatch } = useEditorContext();
  const { tab } = dispatch;

  const [, drag] = useDrag<TreeDroppableItem>(() => ({
    type: TREE_NODE_TYPE,
    item: { sourceNodeId: sourceNodeId },
  }));

  const isOpen = useMemo(() => {
    const collapse = treeCollapses[sourceNodeId];
    return !collapse;
  }, [treeCollapses, sourceNodeId]);

  const { classes, cx } = useStyles();

  const sourceWidgetEntity = useMemo<WidgetEntity | null>(() => {
    const widgetEntity = widgetEntities[sourceNodeId];
    return widgetEntity ? widgetEntity : null;
  }, [sourceNodeId, widgetEntities]);

  return (
    <Box ref={drag} className={classes.draggableItem}>
      {index === 0 && sourceWidgetEntity && (
        <TreeDroppableDivider
          targetWidgetEntity={sourceWidgetEntity}
          position="before"
          level={level}
        />
      )}
      {sourceWidgetEntity && (
        <Box
          className={cx(
            classes.nodeItem,
            sourceNodeId === selectedWidgetEntityId
              ? classes.nodeItemActive
              : null,
          )}
          onClick={() => {
            if (!sourceWidgetEntity) {
              return;
            }
            tab.previewWidget(sourceWidgetEntity.id);
          }}
        >
          <Box style={{ width: LEFT_INDENT_WIDTH * level }}></Box>
          <TreeArrow
            isOpen={isOpen}
            sourceNodeId={sourceNodeId}
            treeNodes={treeNodes}
          />
          <Box style={{ flex: 1 }}>
            <TreeDroppableLabel targetWidgetEntity={sourceWidgetEntity} />
          </Box>
          <Box sx={{ paddingRight: 6 }}>
            <TreeMoreButton
              sourceWidgetEntity={sourceWidgetEntity}
              widgetDefinitions={widgetDefinitions}
              rootNodeId={state.rootNodeId}
              node={dispatch.node}
            />
          </Box>
        </Box>
      )}
      {isOpen && (
        <List>
          {treeNodes[sourceNodeId]?.map((childNode, index) => (
            <TreeDraggableNode
              key={childNode}
              treeNodes={treeNodes}
              widgetEntities={widgetEntities}
              treeCollapses={treeCollapses}
              selectedWidgetEntityId={selectedWidgetEntityId}
              sourceNodeId={childNode}
              level={level + 1}
              index={index}
              widgetDefinitions={widgetDefinitions}
            />
          ))}
        </List>
      )}
      {sourceWidgetEntity && (
        <TreeDroppableDivider
          targetWidgetEntity={sourceWidgetEntity}
          position="after"
          level={level}
        />
      )}
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
    borderRadius: theme.radius.md,
    flexWrap: 'nowrap',

    '&:hover': {
      background: theme.colors.blue[1],
    },
  },
  nodeItemActive: {
    color: theme.white,
    background: theme.colors.blue[8],

    '&:hover': {
      background: theme.colors.blue[8],
    },
  },
}));
