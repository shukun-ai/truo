import { Group, Text } from '@mantine/core';

import { Icon } from '@shukun/component';
import { TypeException } from '@shukun/exception';

import { useMemo } from 'react';

import { TabEntity, useEditorContext } from '../../../editor-context';

export type TabLabelProps = {
  tab: TabEntity;
};

export const TabLabel = ({ tab }: TabLabelProps) => {
  const { state } = useEditorContext();

  const tabLabel = useMemo(() => {
    if (tab.tabType === 'widget') {
      return (
        <Group>
          <Icon type="activityBarNodes" size="0.8rem" />{' '}
          {state.widgets[tab.foreignId]?.label}
        </Group>
      );
    } else if (tab.tabType === 'repository') {
      return (
        <Group>
          <Icon type="activityBarRepositories" size="0.8rem" />{' '}
          {state.repositories[tab.foreignId]?.id}
        </Group>
      );
    } else if (tab.tabType === 'process') {
      return (
        <Group>
          <Icon type="activityBarProcesses" size="0.8rem" />{' '}
          {state.processes[tab.foreignId]?.label}
        </Group>
      );
    } else if (tab.tabType === 'connector') {
      return (
        <Group>
          <Icon type="activityBarConnectors" size="0.8rem" />{' '}
          {state.connectors[tab.foreignId]?.label}
        </Group>
      );
    } else if (tab.tabType === 'metadata') {
      return (
        <Group>
          <Icon type="activityBarMetadatas" size="0.8rem" />{' '}
          {state.metadatas[tab.foreignId]?.label}
        </Group>
      );
    } else if (tab.tabType === 'environment') {
      return (
        <Group>
          <Icon type="activityBarEnvironments" size="0.8rem" />{' '}
          {state.environments[tab.foreignId]?.id}
        </Group>
      );
    }

    throw new TypeException('Did not find specific tab');
  }, [
    tab.tabType,
    tab.foreignId,
    state.widgets,
    state.repositories,
    state.processes,
    state.connectors,
    state.metadatas,
    state.environments,
  ]);

  return <Text fs={tab.isPreview ? 'italic' : undefined}>{tabLabel}</Text>;
};
