import { Box, Text, useMantineTheme } from '@mantine/core';

import { useMemo } from 'react';
import { useDrop } from 'react-dnd';

import { useAppContext } from '../../../../contexts/app-context';

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
    accept: 'ITEM',
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
  }, [canDrop, isOver, theme]);

  return (
    <Box ref={drop} sx={{ ...style }}>
      <Text size="sm">{title}</Text>
    </Box>
  );
};
