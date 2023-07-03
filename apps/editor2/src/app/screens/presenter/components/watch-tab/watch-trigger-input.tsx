import { Box } from '@mantine/core';

import { PresenterWatchEntity } from '../../../../../repositories/presenter/watch-ref';

import { WatchContainerMountedInput } from './watch-container-mounted-input';
import { WatchIntervalInput } from './watch-interval-input';
import { WatchStateChangedInput } from './watch-state-changed-input';

export type WatchTriggerInputProps = {
  watchEntity: PresenterWatchEntity;
};

export const WatchTriggerInput = ({ watchEntity }: WatchTriggerInputProps) => {
  return (
    <Box>
      <Box sx={{ marginBottom: 12 }}>
        <WatchStateChangedInput />
      </Box>
      <Box sx={{ marginBottom: 12 }}>
        <WatchContainerMountedInput />
      </Box>
      <Box sx={{ marginBottom: 12 }}>
        <WatchIntervalInput />
      </Box>
    </Box>
  );
};
