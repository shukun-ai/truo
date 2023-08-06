import { useObservableState } from 'observable-hooks';

import { useMemo } from 'react';

import { TabEntity } from '../../../../../../repositories/tab/tab-ref';
import { useAppContext } from '../../../../../contexts/app-context';

import { RepositoryDetail } from '../../repository-detail/repository-detail';

export type TabRepositoryProps = {
  tab: TabEntity;
};

export const TabRepository = ({ tab }: TabRepositoryProps) => {
  const app = useAppContext();

  const allRepositoryEntities = useObservableState(
    app.repositories.presenterRepository.repositoryRepository.all$,
    [],
  );
  const repositoryDefinitions = useObservableState(
    app.repositories.presenterRepository.repositoryDefinitions$,
    {},
  );

  const repositoryEntity = useMemo(() => {
    if (tab.tabType !== 'repository') {
      return null;
    }
    const { repositoryName } = tab;
    if (!repositoryName) {
      return null;
    }
    return allRepositoryEntities.find(
      (repositoryEntity) => repositoryEntity.id === tab.repositoryEntityId,
    );
  }, [allRepositoryEntities, tab]);

  const definition = useMemo(() => {
    const { type } = repositoryEntity ?? {};
    if (!type) {
      return null;
    }
    const definition = repositoryDefinitions[type];
    if (!definition) {
      return null;
    }
    return definition;
  }, [repositoryEntity, repositoryDefinitions]);

  if (!repositoryEntity || !definition) {
    return null;
  }

  return (
    <RepositoryDetail
      tab={tab}
      repositoryEntity={repositoryEntity}
      definition={definition}
    />
  );
};
