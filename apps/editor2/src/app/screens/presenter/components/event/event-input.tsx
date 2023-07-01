import { Box } from '@mantine/core';
import { PresenterEvent } from '@shukun/schema';

import { HTML5DndProvider } from '../../../../components/dnd/dnd-provider';

import { EventDraggableNode } from './event-draggable-node';

export type EventInputProps = {
  value: PresenterEvent[];
  onChange: (value: PresenterEvent[]) => void;
};

export const EventInput = ({ value, onChange }: EventInputProps) => {
  return (
    <Box>
      <HTML5DndProvider>
        {value.map((event, index) => (
          <EventDraggableNode
            sourceEventName={`Event${index}`}
            event={event}
            index={index}
          />
        ))}
      </HTML5DndProvider>
    </Box>
  );
};
