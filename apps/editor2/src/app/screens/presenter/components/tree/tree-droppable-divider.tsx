import { useMantineTheme } from '@mantine/core';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd';

import {
  ACTIVE_DROPPABLE_HEIGHT,
  INACTIVE_DROPPABLE_HEIGHT,
  LEFT_INDENT_WIDTH,
} from './store';

export const TreeDroppableDivider = ({
  widgetId,
  position,
  level,
}: {
  widgetId: string;
  position: 'top' | 'bottom';
  level: number;
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item, monitor) => {
      //   console.log('dropped', item, widgetId, position);
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
        borderRadius: theme.defaultRadius,
        background: theme.colors.blue[1],
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
