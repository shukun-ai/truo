import { useMantineTheme } from '@mantine/core';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd';

import { move, useEventContext } from './event-context';
import {
  ACTIVE_DROPPABLE_HEIGHT,
  EVENT_NODE_TYPE,
  EventDroppableItem,
  INACTIVE_DROPPABLE_HEIGHT,
} from './event-droppable-type';

export const EventDroppableDivider = ({
  targetEventName,
}: {
  targetEventName: number;
}) => {
  const { events, onChange } = useEventContext();

  const [{ isOver, canDrop }, drop] = useDrop<
    EventDroppableItem,
    unknown,
    { isOver: boolean; canDrop: boolean }
  >(() => ({
    accept: EVENT_NODE_TYPE,
    canDrop: (item) => {
      return item.sourceEventName !== targetEventName;
    },
    drop: (item) => {
      onChange(move(events, item.sourceEventName, targetEventName));
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
        background: theme.colors.blue[8],
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
      <div style={style}></div>
    </div>
  );
};
