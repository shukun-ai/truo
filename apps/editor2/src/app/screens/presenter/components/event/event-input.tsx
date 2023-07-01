import { Box, Button } from '@mantine/core';
import { PresenterEvent } from '@shukun/schema';

import { HTML5DndProvider } from '../../../../components/dnd/dnd-provider';

import { EventProvider } from './event-context';
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
          <EventProvider
            value={{ containerName, event, index, events: value, onChange }}
          >
            <EventDraggableNode />
            <EventDroppableDivider targetEventName={index} />
          </EventProvider>
        ))}
      </HTML5DndProvider>
      <Box>
        <Button
          variant="light"
          fullWidth
          onClick={() => {
            const clonedNews = structuredClone(value);
            clonedNews.push({
              scope: 'app',
              target: 'router',
              action: 'push',
            });
            onChange(clonedNews);
          }}
        >
          新建事件
        </Button>
      </Box>
    </Box>
  );
};
