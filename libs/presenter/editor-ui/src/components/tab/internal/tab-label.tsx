import { Text } from '@mantine/core';

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
      return '组件: ' + state.widgets[tab.foreignId]?.label;
    } else if (tab.tabType === 'repository') {
      return '数据仓库: ' + state.repositories[tab.foreignId]?.id;
    } else if (tab.tabType === 'connector') {
      return '函数流: ' + state.connectors[tab.foreignId]?.label;
    } else if (tab.tabType === 'metadata') {
      return '数据表: ' + state.metadatas[tab.foreignId]?.label;
    } else if (tab.tabType === 'environment') {
      return '环境变量: ' + state.environments[tab.foreignId]?.id;
    }

    throw new TypeException('Did not find specific tab');
  }, [
    tab.tabType,
    tab.foreignId,
    state.widgets,
    state.repositories,
    state.connectors,
    state.metadatas,
    state.environments,
  ]);

  return <Text fs={tab.isPreview ? 'italic' : undefined}>{tabLabel}</Text>;
};
