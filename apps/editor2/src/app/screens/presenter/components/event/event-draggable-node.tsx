import { Box, createStyles } from '@mantine/core';
import { PresenterEvent } from '@shukun/schema';
import { useDrag } from 'react-dnd';

import { EventDroppableDivider } from './event-droppable-divider';
import { EVENT_NODE_TYPE, EventDroppableItem } from './event-droppable-type';

export const EventDraggableNode = ({
  sourceEventName,
  event,
  index,
}: {
  sourceEventName: string;
  event: PresenterEvent;
  index: number;
}) => {
  const [, drag] = useDrag<EventDroppableItem>(() => ({
    type: EVENT_NODE_TYPE,
    item: { sourceEventName },
  }));

  const { classes } = useStyles();

  return (
    <Box ref={drag} className={classes.draggableItem}>
      <Box
        onClick={() => {
          //
        }}
      >
        <Box style={{ flex: 1 }}>{sourceEventName}</Box>
      </Box>
      <EventDroppableDivider targetEventName={sourceEventName} />
    </Box>
  );
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
