import { useObservableState } from 'observable-hooks';

import { useMemo } from 'react';

import { TabEntity } from '../../../../../repositories/tab/tab-ref';
import { useAppContext } from '../../../../contexts/app-context';
import { EnvironmentDetail } from '../environment-detail/environment-detail';

export type TabEnvironmentProps = {
  tab: TabEntity;
};

export const TabEnvironment = ({ tab }: TabEnvironmentProps) => {
  const app = useAppContext();

  const allEnvironmentEntities = useObservableState(
    app.repositories.environmentRepository.all$,
    [],
  );

  const environmentEntity = useMemo(() => {
    if (tab.tabType !== 'environment') {
      return null;
    }
    const { environmentName } = tab;
    if (!environmentName) {
      return null;
    }
    return allEnvironmentEntities.find(
      (environmentEntity) => environmentEntity.id === tab.environmentEntityId,
    );
  }, [allEnvironmentEntities, tab]);

  if (!environmentEntity) {
    return null;
  }

  return <EnvironmentDetail tab={tab} environmentEntity={environmentEntity} />;
};
