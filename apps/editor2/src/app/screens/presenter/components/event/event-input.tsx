import { Box } from '@mantine/core';
import { PresenterEvent } from '@shukun/schema';

import { EventProvider } from './event-context';
import { EventCreate } from './event-create';
import { EventDraggableNode } from './event-draggable-node';
import { EventDroppableDivider } from './event-droppable-divider';

export type EventInputProps = {
  containerName: string;
  value: PresenterEvent[];
  onChange: (value: PresenterEvent[]) => void;
};

export const EventInput = ({
  containerName,
  value,
  onChange,
}: EventInputProps) => {
  return (
    <Box>
      {value.map((event, index) => (
        <EventProvider
          key={index}
          value={{ containerName, event, index, events: value, onChange }}
        >
          <EventDraggableNode />
          <EventDroppableDivider targetEventName={index} />
        </EventProvider>
      ))}
      <Box>
        <EventCreate
          containerName={containerName}
          events={value}
          onChange={onChange}
        />
      </Box>
    </Box>
  );
};
