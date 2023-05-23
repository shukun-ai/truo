import { Box, Text, useMantineTheme } from '@mantine/core';

import { useMemo } from 'react';
import { useDrop } from 'react-dnd';

import { ROOT_NODE_ID } from '../../../../../repositories/presenter-store';
import { useAppContext } from '../../../../contexts/app-context';

import { TREE_NODE_TYPE } from './store';
import { TreeDroppableItem } from './tree-droppable-type';

export type TreeDroppableLabelProps = {
  targetNodeId: string;
  title: string;
};

export const TreeDroppableLabel = ({
  targetNodeId,
  title,
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
        item.sourceNodeId !== targetNodeId && targetNodeId !== ROOT_NODE_ID
      );
    },
    drop: (item) => {
      const { sourceNodeId } = item;

      app.repositories.presenterRepository.moveToInside(
        sourceNodeId,
        targetNodeId,
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
        background: theme.colors.blue[1],
        borderRadius: theme.defaultRadius,
      };
    }
    return {};
  }, [canDrop, isOver, theme.colors.blue, theme.defaultRadius]);

  return (
    <Box ref={drop} sx={{ ...style }}>
      <Text size="sm">{title}</Text>
    </Box>
  );
};
