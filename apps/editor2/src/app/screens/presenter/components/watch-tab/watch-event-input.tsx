import { Box } from '@mantine/core';

import { PresenterWatchEntity } from '../../../../../repositories/presenter/watch-ref';
import { EventInput } from '../event/event-input';

import { useWatchFormContext } from './watch-context';

export type WatchEventInputProps = {
  watchEntity: PresenterWatchEntity;
};

export const WatchEventInput = ({ watchEntity }: WatchEventInputProps) => {
  const form = useWatchFormContext();
  const formProps = form.getInputProps('events');

  return (
    <Box sx={{ marginBottom: 16 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
        <Box sx={{ marginRight: 6 }}>事件</Box>
      </Box>
      <EventInput containerName={watchEntity.containerName} {...formProps} />
    </Box>
  );
};
