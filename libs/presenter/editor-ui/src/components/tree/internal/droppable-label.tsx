import { Badge, Box, Group, Text, useMantineTheme } from '@mantine/core';

import { useMemo } from 'react';
import { useDrop } from 'react-dnd';

import { WidgetEntity, useEditorContext } from '../../../editor-context';

import {
  SHOW_WIDGET_TAG,
  TREE_NODE_TYPE,
  TreeDroppableItem,
} from './constants';

export type TreeDroppableLabelProps = {
  targetWidgetEntity: WidgetEntity;
};

export const TreeDroppableLabel = ({
  targetWidgetEntity,
}: TreeDroppableLabelProps) => {
  const { state, dispatch } = useEditorContext();
  const { rootNodeId } = state;
  const { node } = dispatch;

  const [{ isOver, canDrop }, drop] = useDrop<
    TreeDroppableItem,
    unknown,
    { isOver: boolean; canDrop: boolean }
  >(() => ({
    accept: TREE_NODE_TYPE,
    canDrop: (item) => {
      return (
        item.sourceNodeId !== targetWidgetEntity.id &&
        targetWidgetEntity.id !== rootNodeId
      );
    },
    drop: (item) => {
      const { sourceNodeId } = item;
      node.moveToInside(sourceNodeId, targetWidgetEntity.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      sourceItem: monitor.getItem(),
    }),
  }));

  const theme = useMantineTheme();

  const style = useMemo(() => {
    if (isOver && canDrop) {
      return {
        background: theme.colors.blue[3],
        color: theme.white,
        borderRadius: theme.radius.sm,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 6,
      };
    }
    return {};
  }, [canDrop, isOver, theme.colors.blue, theme.radius.sm, theme.white]);

  const labelComponent = useMemo(() => {
    return (
      <Group>
        <Text size="sm">{targetWidgetEntity.label}</Text>
        {SHOW_WIDGET_TAG && (
          <Badge size="xs" sx={{ textTransform: 'lowercase' }}>
            {targetWidgetEntity.tag}
          </Badge>
        )}
      </Group>
    );
  }, [targetWidgetEntity.label, targetWidgetEntity.tag]);

  return (
    <Box ref={drop} sx={{ ...style }}>
      {labelComponent}
    </Box>
  );
};
