import { Box, Container, ScrollArea } from '@mantine/core';
import { useObservableState } from 'observable-hooks';

import { useMemo } from 'react';

import { PresenterTabEntity } from '../../../../../repositories/presenter/tab-ref';
import { useAppContext } from '../../../../contexts/app-context';

import { RepositoryForm } from '../repository-tab/repository-form';
import { WidgetForm } from '../widget/widget-form';

export type TabRepositoryProps = {
  tab: PresenterTabEntity;
};

export const TabRepository = ({ tab }: TabRepositoryProps) => {
  const app = useAppContext();

  const allRepositories = useObservableState(
    app.repositories.presenterRepository.repositoryRepository.all$,
    [],
  );
  const repositoryDefinitions = useObservableState(
    app.repositories.presenterRepository.repositoryDefinitions$,
    {},
  );

  const repository = useMemo(() => {
    if (tab.tabType !== 'repository') {
      return null;
    }
    const { repositoryName } = tab;
    if (!repositoryName) {
      return null;
    }
    return allRepositories.find(
      (repository) => repository.id === tab.repositoryName,
    );
  }, [allRepositories, tab]);

  const definition = useMemo(() => {
    const { type } = repository ?? {};
    if (!type) {
      return null;
    }
    const definition = repositoryDefinitions[type];
    if (!definition) {
      return null;
    }
    return definition;
  }, [repository, repositoryDefinitions]);

  if (!repository || !definition) {
    return <Box>未找到相关组件</Box>;
  }

  return (
    <ScrollArea sx={{ width: '100%', height: '100%' }}>
      <Container fluid>
        <RepositoryForm
          tab={tab}
          repository={repository}
          definition={definition}
        />
      </Container>
    </ScrollArea>
  );
};
