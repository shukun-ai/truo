import { Box } from '@mantine/core';

import { PresenterWatchEntity } from '../../../../../repositories/presenter/watch-ref';

import { WatchEventInput } from './watch-event-input';

export type WatchDetailProps = {
  watchEntity: PresenterWatchEntity;
};

export const WatchDetail = ({ watchEntity }: WatchDetailProps) => {
  return (
    <Box>
      <WatchEventInput watchEntity={watchEntity} />
    </Box>
  );
};
