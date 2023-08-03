import { Box, createStyles } from '@mantine/core';
import { PresenterTreeNodes, WidgetSchema } from '@shukun/schema';
import { useMemo } from 'react';
import { useDrag } from 'react-dnd';

import { PresenterTreeCollapse } from '../../../../../../repositories/presenter/tree-ui-ref';

import { PresenterWidgetEntity } from '../../../../../../repositories/presenter/widget-ref';
import { useAppContext } from '../../../../../contexts/app-context';

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
  selectedContainerEntityId,
  widgetDefinitions,
}: {
  treeNodes: PresenterTreeNodes;
  widgetEntities: Record<string, PresenterWidgetEntity>;
  treeCollapses: Record<string, PresenterTreeCollapse>;
  sourceNodeId: string;
  level: number;
  index: number;
  selectedWidgetEntityId?: string;
  selectedContainerEntityId: string;
  widgetDefinitions: Record<string, WidgetSchema>;
}) => {
  const app = useAppContext();

  const [, drag] = useDrag<TreeDroppableItem>(() => ({
    type: TREE_NODE_TYPE,
    item: { sourceNodeId: sourceNodeId },
  }));

  const isOpen = useMemo(() => {
    const collapse = treeCollapses[sourceNodeId];
    return !collapse;
  }, [treeCollapses, sourceNodeId]);

  const { classes, cx } = useStyles();

  const sourceWidgetEntity = useMemo<PresenterWidgetEntity | null>(() => {
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
            app.repositories.tabRepository.previewWidgetTab(
              selectedContainerEntityId,
              sourceWidgetEntity.widgetName,
              sourceWidgetEntity.id,
            );
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
              selectedContainerEntityId={selectedContainerEntityId}
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
