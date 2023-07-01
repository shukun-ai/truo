import { Box, Button } from '@mantine/core';
import { PresenterEvent } from '@shukun/schema';
import { useState } from 'react';

import { add } from './event-context';
import { EventForm } from './event-form';

export type EventCreateProps = {
  containerName: string;
  events: PresenterEvent[];
  onChange: (event: PresenterEvent[]) => void;
};

export const EventCreate = ({
  containerName,
  events,
  onChange,
}: EventCreateProps) => {
  const [creating, setCreating] = useState(false);

  const event: PresenterEvent = {
    scope: 'app',
    target: 'router',
    action: 'push',
  };

  return (
    <Box>
      {creating ? (
        <EventForm
          containerName={containerName}
          event={event}
          onChange={(value) => {
            onChange(add(events, value));
            setCreating(false);
          }}
          onCancel={() => setCreating(false)}
        />
      ) : (
        <Button
          variant="light"
          fullWidth
          onClick={() => {
            setCreating(true);
          }}
        >
          新建事件
        </Button>
      )}
    </Box>
  );
};
