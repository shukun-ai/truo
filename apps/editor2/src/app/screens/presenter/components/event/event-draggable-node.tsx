import { ActionIcon, Card, Group, createStyles } from '@mantine/core';
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
}: {
  containerName: string;
  sourceEventName: string;
  event: PresenterEvent;
  index: number;
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
      <Group style={{ flex: 1 }}>
        <ActionIcon className={classes.draggableItem} ref={drag}>
          <IconMenuOrder size="1.125rem" />
        </ActionIcon>
        <EventDetail
          containerName={containerName}
          event={event}
          onChange={() => {
            //
          }}
        />
      </Group>
    </Card>
  );
};

const useStyles = createStyles((theme) => ({
  draggableItem: {
    cursor: 'move',
  },
}));
