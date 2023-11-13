import { useMantineTheme } from '@mantine/core';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd';

import { useTreeMenuContext } from '../tree-menu-context';
import { TreeMenuListBase } from '../tree-menu-type';

import {
  ACTIVE_DROPPABLE_HEIGHT,
  INACTIVE_DROPPABLE_HEIGHT,
  LEFT_INDENT_WIDTH,
  TREE_NODE_TYPE,
  TreeDroppableItem,
} from './constants';

export const TreeDroppableDivider = <T extends TreeMenuListBase>({
  targetNode,
  position,
  level,
}: {
  targetNode: T;
  position: 'before' | 'after';
  level: number;
}) => {
  const { rootNodeKey, moveToBeside } = useTreeMenuContext();

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
      moveToBeside && moveToBeside(sourceKey, targetNode.key, position);
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
        flex: 1,
        height: ACTIVE_DROPPABLE_HEIGHT,
        borderRadius: theme.radius.sm,
        background: theme.colors.blue[3],
      };
    }
    if (canDrop) {
      return { flex: 1, height: INACTIVE_DROPPABLE_HEIGHT };
    }
    return {
      flex: 1,
      height: INACTIVE_DROPPABLE_HEIGHT,
    };
  }, [canDrop, isOver, theme]);

  return (
    <div style={{ display: 'flex' }} ref={drop}>
      <div style={{ width: LEFT_INDENT_WIDTH * level }}></div>
      <div style={style}></div>
    </div>
  );
};
