import { ActionIcon, Box, Card, createStyles } from '@mantine/core';
import { PresenterEvent } from '@shukun/schema';
import { IconMenuOrder } from '@tabler/icons-react';
import { useDrag } from 'react-dnd';

import { EventDetail } from './event-detail';
import { EVENT_NODE_TYPE, EventDroppableItem } from './event-droppable-type';

export const EventDraggableNode = ({
  containerName,
  sourceEventName,
  event,
  index,
  onChange,
}: {
  containerName: string;
  sourceEventName: string;
  event: PresenterEvent;
  index: number;
  onChange: (event: PresenterEvent, index: number) => void;
}) => {
  const [, drag, preview] = useDrag<EventDroppableItem>(() => ({
    type: EVENT_NODE_TYPE,
    item: { sourceEventName },
  }));

  const { classes } = useStyles();

  return (
    <Card
      withBorder
      ref={preview}
      onClick={() => {
        //
      }}
    >
      <Box
        sx={{
          display: 'flex',
          minWidth: 0,
          minHeight: 0,
          alignItems: 'center',
        }}
      >
        <ActionIcon className={classes.draggableItem} ref={drag}>
          <IconMenuOrder size="1.125rem" />
        </ActionIcon>
        <Box sx={{ flex: 1 }}>
          <EventDetail
            containerName={containerName}
            event={event}
            onChange={(values) => {
              onChange(values, index);
            }}
          />
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
