import { Box, Group, Text, useMantineTheme } from '@mantine/core';

import { useMemo } from 'react';
import { useDrop } from 'react-dnd';

import { useTreeMenuContext } from '../tree-menu-context';

import { TreeMenuListBase } from '../tree-menu-type';

import { TREE_NODE_TYPE, TreeDroppableItem } from './constants';

export const TreeDroppableLabel = <T extends TreeMenuListBase>({
  targetNode,
}: {
  targetNode: T;
}) => {
  const { rootNodeKey, moveToInside } = useTreeMenuContext();

  const [{ isOver, canDrop }, drop] = useDrop<
    TreeDroppableItem,
    unknown,
    { isOver: boolean; canDrop: boolean }
  >(() => ({
    accept: TREE_NODE_TYPE,
    canDrop: (item) => {
      return (
        item.sourceKey !== targetNode.key && targetNode.key !== rootNodeKey
      );
    },
    drop: (item) => {
      const { sourceKey } = item;
      moveToInside && moveToInside(sourceKey, targetNode.key);
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
        <Text size="sm">{targetNode.label}</Text>
        {/* {SHOW_WIDGET_TAG && (
          <Badge size="xs" sx={{ textTransform: 'lowercase' }}>
            {targetWidgetEntity.tag}
          </Badge>
        )} */}
      </Group>
    );
  }, [targetNode.label]);

  return (
    <Box ref={drop} sx={{ ...style }}>
      {labelComponent}
    </Box>
  );
};
