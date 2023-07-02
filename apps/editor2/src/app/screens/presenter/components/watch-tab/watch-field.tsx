import { Box } from '@mantine/core';

import { PresenterWatchEntity } from '../../../../../repositories/presenter/watch-ref';

export type WatchFieldProps = {
  watchEntity: PresenterWatchEntity;
};

export const WatchField = ({ watchEntity }: WatchFieldProps) => {
  return <Box>未配置组件 {watchEntity.watchName}</Box>;
};
