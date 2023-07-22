import {
  Box,
  Divider,
  Tabs,
  Tooltip,
  createStyles,
  useMantineTheme,
} from '@mantine/core';
import {
  IconRoute,
  IconBinaryTree,
  IconBuildingWarehouse,
  IconAtom2Filled,
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
import { ContainerPane } from './container/container-pane';
import { EnvironmentListPane } from './environment-list/environment-list-pane';
import { MetadataListPane } from './metadata-list/metadata-list-pane';
import { RepositoryPane } from './repository-pane/repository-pane';
import { ScreenPane } from './screen/screen-pane';
import { TreePane } from './tree/tree-pane';
import { WatchPane } from './watch-pane/watch-pane';

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
        {activityTabs
          .filter((tab) => !tab.disabled)
          .map((tab) => (
            <Tooltip label={tab.label} position="right" withArrow>
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

      {activityTabs.map((tab) => (
        <Tabs.Panel value={tab.value} className={cx(classes.panel)}>
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
  tabs: {},
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
  const { mode } = useEditorContext();

  return [
    {
      label: '页面',
      value: ActivityTabs.Screens,
      icon: <IconRoute size="1.2rem" />,
      disabled: mode === 'system',
      pane: <ScreenPane />,
    },
    {
      label: '组件树',
      value: ActivityTabs.Widgets,
      icon: <IconBinaryTree size="1.2rem" />,
      disabled: mode === 'system',
      pane: (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            minHeight: 0,
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ height: 200 }}>
            <ContainerPane />
          </Box>
          <Divider />
          <TreePane />
        </Box>
      ),
    },
    {
      label: '数据仓库',
      value: ActivityTabs.Repositories,
      icon: <IconBuildingWarehouse size="1.2rem" />,
      disabled: mode === 'system',
      pane: (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            minHeight: 0,
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ height: 200 }}>
            <ContainerPane />
          </Box>
          <Divider />
          <RepositoryPane />
        </Box>
      ),
    },
    {
      label: '观察器',
      value: ActivityTabs.Watches,
      icon: <Icon3dCubeSphere size="1.2rem" />,
      disabled: mode === 'system',
      pane: (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            minHeight: 0,
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ height: 200 }}>
            <ContainerPane />
          </Box>
          <Divider />
          <WatchPane />
        </Box>
      ),
    },
    {
      label: '元数据',
      value: ActivityTabs.Metadatas,
      icon: <IconAtom2Filled size="1.2rem" />,
      pane: <MetadataListPane />,
    },
    {
      label: '连接器',
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
  const { mode } = useEditorContext();

  const selectedActivityTab = useObservableState(
    app.repositories.presenterRepository.selectedActivityTab$,
    null,
  );

  return useMemo(() => {
    if (selectedActivityTab === null) {
      return null;
    } else if (
      mode === 'system' &&
      !systemActivityTabs.includes(selectedActivityTab)
    ) {
      return ActivityTabs.Metadatas;
    } else {
      return selectedActivityTab;
    }
  }, [mode, selectedActivityTab]);
};
