import { Badge, Box, Group, Text, useMantineTheme } from '@mantine/core';

import { useMemo } from 'react';
import { useDrop } from 'react-dnd';

import { ROOT_NODE_ID } from '../../../../../repositories/presenter/presenter-store';
import { PresenterWidgetEntity } from '../../../../../repositories/presenter/widget-ref';
import { useAppContext } from '../../../../contexts/app-context';

import { TREE_NODE_TYPE } from './store';
import { TreeDroppableItem } from './tree-droppable-type';

export type TreeDroppableLabelProps = {
  targetWidgetEntity: PresenterWidgetEntity;
};

export const TreeDroppableLabel = ({
  targetWidgetEntity,
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
        item.sourceNodeId !== targetWidgetEntity.id &&
        targetWidgetEntity.widgetName !== ROOT_NODE_ID
      );
    },
    drop: (item) => {
      const { sourceNodeId } = item;

      app.repositories.presenterRepository.treeRepository.moveToInside(
        sourceNodeId,
        targetWidgetEntity.id,
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
    if (targetWidgetEntity.widgetName === ROOT_NODE_ID) {
      return <Text size="sm">组件树</Text>;
    }
    return (
      <Group>
        <Text size="sm">{targetWidgetEntity.widgetName}</Text>
        <Badge size="sm" sx={{ textTransform: 'lowercase' }}>
          {targetWidgetEntity.tag}
        </Badge>
      </Group>
    );
  }, [targetWidgetEntity]);

  return (
    <Box ref={drop} sx={{ ...style }}>
      {labelComponent}
    </Box>
  );
};
