import { Box, Container, ScrollArea } from '@mantine/core';
import { useObservableState } from 'observable-hooks';

import { useMemo } from 'react';

import { PresenterTabEntity } from '../../../../../repositories/presenter/tab-ref';
import { useAppContext } from '../../../../contexts/app-context';
import { WatchForm } from '../watch-tab/watch-form';

export type TabWatchProps = {
  tab: PresenterTabEntity;
};

export const TabWatch = ({ tab }: TabWatchProps) => {
  const app = useAppContext();

  const allWatchEntities = useObservableState(
    app.repositories.presenterRepository.watchRepository.all$,
    [],
  );

  const watchEntity = useMemo(() => {
    if (tab.tabType !== 'watch') {
      return null;
    }
    const { watchName } = tab;
    if (!watchName) {
      return null;
    }
    return allWatchEntities.find(
      (watchEntity) => watchEntity.id === tab.watchEntityId,
    );
  }, [allWatchEntities, tab]);

  if (!watchEntity) {
    return <Box>未找到相关数据仓库</Box>;
  }

  return (
    <ScrollArea sx={{ width: '100%', height: '100%' }}>
      <Container fluid>
        <WatchForm tab={tab} watchEntity={watchEntity} />
      </Container>
    </ScrollArea>
  );
};
