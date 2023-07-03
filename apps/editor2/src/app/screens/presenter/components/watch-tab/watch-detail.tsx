import { Box } from '@mantine/core';

import { PresenterWatchEntity } from '../../../../../repositories/presenter/watch-ref';

import { WatchEventInput } from './watch-event-input';
import { WatchTriggerInput } from './watch-trigger-input';

export type WatchDetailProps = {
  watchEntity: PresenterWatchEntity;
};

export const WatchDetail = ({ watchEntity }: WatchDetailProps) => {
  return (
    <Box>
      <WatchTriggerInput watchEntity={watchEntity} />
      <WatchEventInput watchEntity={watchEntity} />
    </Box>
  );
};
