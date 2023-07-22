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
  const allConnectors = useObservableState(
    app.repositories.connectorRepository.all$,
  );
  const allMetadatas = useObservableState(
    app.repositories.metadataRepository.all$,
  );
  const allEnvironments = useObservableState(
    app.repositories.environmentRepository.all$,
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
          (watch) =>
            tab.containerName === watch.containerName &&
            tab.watchName === watch.watchName,
        )?.watchName
      );
    } else if (tab.tabType === 'connector') {
      return (
        '函数流: ' +
        allConnectors?.find(
          (connector) => tab.connectorName === connector.connectorName,
        )?.connectorName
      );
    } else if (tab.tabType === 'metadata') {
      return (
        '数据表: ' +
        allMetadatas?.find(
          (metadata) => tab.metadataName === metadata.metadataName,
        )?.metadataName
      );
    } else if (tab.tabType === 'environment') {
      return (
        '环境变量: ' +
        allEnvironments?.find(
          (environment) => tab.environmentName === environment.environmentName,
        )?.environmentName
      );
    }

    throw new TypeException('Did not find specific tab');
  }, [
    allConnectors,
    allRepositories,
    allWatches,
    allWidgets,
    allMetadatas,
    allEnvironments,
    tab,
  ]);

  return <Text fs={tab.isPreview ? 'italic' : undefined}>{tabLabel}</Text>;
};
