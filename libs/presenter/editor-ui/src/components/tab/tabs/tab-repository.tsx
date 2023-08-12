import { useMemo } from 'react';

import { TabEntity, useEditorContext } from '../../../editor-context';
import { RepositoryDetail } from '../../repository-detail/repository-detail';

export type TabRepositoryProps = {
  tab: TabEntity;
};

export const TabRepository = ({ tab }: TabRepositoryProps) => {
  const { state } = useEditorContext();

  const repositoryEntity = useMemo(() => {
    if (tab.tabType !== 'repository') {
      return null;
    }
    return state.repositories[tab.foreignId];
  }, [state.repositories, tab.foreignId, tab.tabType]);

  const definition = useMemo(() => {
    const { type } = repositoryEntity ?? {};
    if (!type) {
      return null;
    }
    const definition = state.repositoryDefinitions[type];
    if (!definition) {
      return null;
    }
    return definition;
  }, [repositoryEntity, state.repositoryDefinitions]);

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
