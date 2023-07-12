import { Text } from '@mantine/core';

import { TypeException } from '@shukun/exception';
import { useObservableState } from 'observable-hooks';

import { useMemo } from 'react';

import { TabEntity } from '../../../../../repositories/tab/tab-ref';
import { useAppContext } from '../../../../contexts/app-context';

export type TabLabelProps = {
  tab: TabEntity;
};

export const TabLabel = ({ tab }: TabLabelProps) => {
  const app = useAppContext();

  const allWidgets = useObservableState(
    app.repositories.presenterRepository.widgetRepository.allWidgets$,
  );
  const allRepositories = useObservableState(
    app.repositories.presenterRepository.repositoryRepository.all$,
  );
  const allWatches = useObservableState(
    app.repositories.presenterRepository.watchRepository.all$,
  );

  const tabLabel = useMemo(() => {
    if (tab.tabType === 'widget') {
      return (
        '组件: ' +
        allWidgets?.find(
          (widget) =>
            tab.containerName === widget.containerName &&
            tab.widgetName === widget.widgetName,
        )?.widgetName
      );
    } else if (tab.tabType === 'repository') {
      return (
        '数据仓库: ' +
        allRepositories?.find(
          (repository) =>
            tab.containerName === repository.containerName &&
            tab.repositoryName === repository.repositoryName,
        )?.repositoryName
      );
    } else if (tab.tabType === 'watch') {
      return (
        '观察器: ' +
        allWatches?.find(
          (repository) =>
            tab.containerName === repository.containerName &&
            tab.watchName === repository.watchName,
        )?.watchName
      );
    }

    throw new TypeException('Did not find specific tab.');
  }, [allRepositories, allWatches, allWidgets, tab]);

  return <Text fs={tab.isPreview ? 'italic' : undefined}>{tabLabel}</Text>;
};
