import { useObservableState } from 'observable-hooks';

import { useMemo } from 'react';

import { TabEntity } from '../../../../../../repositories/tab/tab-ref';
import { useAppContext } from '../../../../../contexts/app-context';
import { WatchDetail } from '../../watch-detail/watch-detail';

export type TabWatchProps = {
  tab: TabEntity;
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
    return null;
  }

  return <WatchDetail tab={tab} watchEntity={watchEntity} />;
};
