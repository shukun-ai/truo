import { ActionIcon, Box, Card, createStyles } from '@mantine/core';
import { IconGripVertical } from '@tabler/icons-react';
import { useDrag } from 'react-dnd';

import { useEventContext } from './event-context';
import { EventDetail } from './event-detail';
import { EVENT_NODE_TYPE, EventDroppableItem } from './event-droppable-type';

export const EventDraggableNode = () => {
  const { index } = useEventContext();

  const sourceEventName = index;

  const [, drag, preview] = useDrag<EventDroppableItem>(() => ({
    type: EVENT_NODE_TYPE,
    item: { sourceEventName },
  }));

  const { classes } = useStyles();

  return (
    <Card withBorder ref={preview}>
      <Box
        sx={{
          display: 'flex',
          minWidth: 0,
          minHeight: 0,
          alignItems: 'center',
        }}
      >
        <ActionIcon className={classes.draggableItem} ref={drag}>
          <IconGripVertical size="1rem" />
        </ActionIcon>
        <Box sx={{ flex: 1 }}>
          <EventDetail />
        </Box>
      </Box>
    </Card>
  );
};

const useStyles = createStyles((theme) => ({
  draggableItem: {
    cursor: 'move',
  },
}));
