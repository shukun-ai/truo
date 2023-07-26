import {
  Box,
  Tabs,
  Tooltip,
  createStyles,
  useMantineTheme,
} from '@mantine/core';
import { ShukunLogo } from '@shukun/component';
import {
  IconBinaryTree,
  IconBuildingWarehouse,
  IconDatabaseCog,
  IconGizmo,
  Icon3dCubeSphere,
  IconVariable,
} from '@tabler/icons-react';

import { useObservableState } from 'observable-hooks';

import { ReactNode, useMemo } from 'react';

import {
  ActivityTabs,
  systemActivityTabs,
} from '../../../../repositories/presenter/presenter-store';

import { useAppContext } from '../../../contexts/app-context';

import { useEditorContext } from '../editor-context';

import { ConnectorListPane } from './connector-list/connector-list-pane';
import { EnvironmentListPane } from './environment-list/environment-list-pane';
import { MetadataListPane } from './metadata-list/metadata-list-pane';
import { RepositoryList } from './repository-list/repository-list';
import { TreePane } from './tree/tree-pane';
import { WatchPane } from './watch-list/watch-pane';

export const ActivityBar = () => {
  const { classes, cx } = useStyles();

  const app = useAppContext();

  const activeTab = useActiveTab();

  const activityTabs = useActivityTabs();

  const theme = useMantineTheme();

  return (
    <Tabs
      className={cx(classes.wrapper)}
      orientation="vertical"
      value={activeTab}
      onTabChange={(value) => {
        app.repositories.presenterRepository.chooseActivityTab(
          value === activeTab ? null : (value as ActivityTabs),
        );
      }}
    >
      <Tabs.List className={cx(classes.tabs)}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          <ShukunLogo />
        </Box>
        {activityTabs
          .filter((tab) => !tab.disabled)
          .map((tab) => (
            <Tooltip
              key={tab.value}
              label={tab.label}
              position="right"
              withArrow
            >
              <Tabs.Tab
                value={tab.value}
                icon={tab.icon}
                sx={{
                  background:
                    tab.value === activeTab
                      ? theme.colors.gray[3]
                      : 'transparent',
                  borderRightWidth: 0,
                  marginRight: 0,
                  borderRadius: 0,
                }}
              />
            </Tooltip>
          ))}
      </Tabs.List>

      {activityTabs
        .filter((tab) => !tab.disabled)
        .map((tab) => (
          <Tabs.Panel
            key={tab.value}
            value={tab.value}
            className={cx(classes.panel)}
          >
            {tab.pane}
          </Tabs.Panel>
        ))}
    </Tabs>
  );
};

const useStyles = createStyles(() => ({
  wrapper: {
    overflow: 'hidden',
    height: '100%',
  },
  tabs: {
    borderRightWidth: 1,
  },
  panel: {
    width: 240,
    overflow: 'hidden',
  },
}));

const useActivityTabs = (): {
  label: string;
  value: ActivityTabs;
  icon: ReactNode;
  disabled?: boolean;
  pane: ReactNode;
}[] => {
  const { disabledPresenter } = useEditorContext();

  return [
    {
      label: '组件树',
      value: ActivityTabs.Widgets,
      icon: <IconBinaryTree size="1.2rem" />,
      disabled: disabledPresenter,
      pane: <TreePane />,
    },
    {
      label: '数据仓库',
      value: ActivityTabs.Repositories,
      icon: <IconBuildingWarehouse size="1.2rem" />,
      disabled: disabledPresenter,
      pane: <RepositoryList />,
    },
    {
      label: '观察器',
      value: ActivityTabs.Watches,
      icon: <Icon3dCubeSphere size="1.2rem" />,
      disabled: disabledPresenter,
      pane: <WatchPane />,
    },
    {
      label: '数据表',
      value: ActivityTabs.Metadatas,
      icon: <IconDatabaseCog size="1.2rem" />,
      pane: <MetadataListPane />,
    },
    {
      label: '函数流',
      value: ActivityTabs.Connectors,
      icon: <IconGizmo size="1.2rem" />,
      pane: <ConnectorListPane />,
    },
    {
      label: '环境变量',
      value: ActivityTabs.Environments,
      icon: <IconVariable size="1.2rem" />,
      pane: <EnvironmentListPane />,
    },
  ];
};

const useActiveTab = () => {
  const app = useAppContext();
  const { disabledPresenter } = useEditorContext();

  const selectedActivityTab = useObservableState(
    app.repositories.presenterRepository.selectedActivityTab$,
    null,
  );

  return useMemo(() => {
    if (selectedActivityTab === null) {
      return null;
    } else if (
      disabledPresenter &&
      !systemActivityTabs.includes(selectedActivityTab)
    ) {
      return ActivityTabs.Metadatas;
    } else {
      return selectedActivityTab;
    }
  }, [disabledPresenter, selectedActivityTab]);
};
