import { Box, Button } from '@mantine/core';
import { PresenterEvent } from '@shukun/schema';

import { add } from './event-context';

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
  return (
    <Box>
      <Button
        variant="light"
        fullWidth
        onClick={() => {
          onChange(add(events, event));
        }}
      >
        新建事件
      </Button>
    </Box>
  );
};

const event: PresenterEvent = {
  scope: 'app',
  target: 'router',
  action: 'push',
};
