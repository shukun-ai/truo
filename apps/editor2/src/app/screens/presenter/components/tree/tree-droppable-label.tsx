import { Badge, Box, Group, Text, useMantineTheme } from '@mantine/core';

import { useMemo } from 'react';
import { useDrop } from 'react-dnd';

import { ROOT_NODE_ID } from '../../../../../repositories/presenter/presenter-store';
import { useAppContext } from '../../../../contexts/app-context';

import { TREE_NODE_TYPE } from './store';
import { TreeDroppableItem } from './tree-droppable-type';

export type TreeDroppableLabelProps = {
  targetWidgetEntityId: string;
  title?: string;
  tag?: string;
};

export const TreeDroppableLabel = ({
  targetWidgetEntityId,
  title,
  tag,
}: TreeDroppableLabelProps) => {
  const app = useAppContext();

  const [{ isOver, canDrop }, drop] = useDrop<
    TreeDroppableItem,
    unknown,
    { isOver: boolean; canDrop: boolean }
  >(() => ({
    accept: TREE_NODE_TYPE,
    canDrop: (item) => {
      return (
        item.sourceNodeId !== targetWidgetEntityId &&
        targetWidgetEntityId !== ROOT_NODE_ID
      );
    },
    drop: (item) => {
      const { sourceNodeId } = item;

      app.repositories.presenterRepository.treeRepository.moveToInside(
        sourceNodeId,
        targetWidgetEntityId,
      );
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
        background: theme.colors.blue[8],
        color: theme.white,
        borderRadius: theme.defaultRadius,
      };
    }
    return {};
  }, [canDrop, isOver, theme.colors.blue, theme.defaultRadius, theme.white]);

  const labelComponent = useMemo(() => {
    if (targetWidgetEntityId === 'root') {
      return <Text size="sm">组件树</Text>;
    }
    if (!title && !tag) {
      return <Text size="sm">异常组件</Text>;
    }
    return (
      <Group>
        {title && <Text size="sm">{title}</Text>}
        {tag && (
          <Badge size="sm" sx={{ textTransform: 'lowercase' }}>
            {tag}
          </Badge>
        )}
      </Group>
    );
  }, [tag, targetWidgetEntityId, title]);

  return (
    <Box ref={drop} sx={{ ...style }}>
      {labelComponent}
    </Box>
  );
};
