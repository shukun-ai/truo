import { Box } from '@mantine/core';
import { PresenterEvent } from '@shukun/schema';

import { HTML5DndProvider } from '../../../../components/dnd/dnd-provider';

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
      <HTML5DndProvider>
        {value.map((event, index) => (
          <>
            <EventDraggableNode
              containerName={containerName}
              sourceEventName={`Event${index}`}
              event={event}
              index={index}
              onChange={(event, index) => {
                const events = structuredClone(value);
                events.splice(index, 1, event);
                onChange(events);
              }}
            />
            <EventDroppableDivider targetEventName={`Event${index}`} />
          </>
        ))}
      </HTML5DndProvider>
    </Box>
  );
};
