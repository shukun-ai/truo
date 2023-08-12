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
  IconVariable,
} from '@tabler/icons-react';

import { ReactNode, useMemo } from 'react';

import { ActivityTab, useEditorContext } from '../editor-context';

import { ConnectorListPane } from './connector-list/connector-list-pane';
import { EnvironmentListPane } from './environment-list/environment-list-pane';
import { MetadataListPane } from './metadata-list/metadata-list-pane';
import { RepositoryList } from './repository-list/repository-list';
import { TreePane } from './tree/tree-pane';

export const ActivityBar = () => {
  const { classes, cx } = useStyles();

  const { dispatch } = useEditorContext();

  const activeTab = useActiveTab();

  const activityTabs = useActivityTabs();

  const theme = useMantineTheme();

  return (
    <Tabs
      className={cx(classes.wrapper)}
      orientation="vertical"
      value={activeTab}
      onTabChange={(value) => {
        dispatch.editor.chooseActivityTab(
          value === activeTab ? null : (value as ActivityTab),
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
  value: ActivityTab;
  icon: ReactNode;
  disabled?: boolean;
  pane: ReactNode;
}[] => {
  const { disabledPresenter } = useEditorContext();

  return [
    {
      label: '组件树',
      value: ActivityTab.Widgets,
      icon: <IconBinaryTree size="1.2rem" />,
      disabled: disabledPresenter,
      pane: <TreePane />,
    },
    {
      label: '数据仓库',
      value: ActivityTab.Repositories,
      icon: <IconBuildingWarehouse size="1.2rem" />,
      disabled: disabledPresenter,
      pane: <RepositoryList />,
    },
    {
      label: '数据表',
      value: ActivityTab.Metadatas,
      icon: <IconDatabaseCog size="1.2rem" />,
      pane: <MetadataListPane />,
    },
    {
      label: '函数流',
      value: ActivityTab.Connectors,
      icon: <IconGizmo size="1.2rem" />,
      pane: <ConnectorListPane />,
    },
    {
      label: '环境变量',
      value: ActivityTab.Environments,
      icon: <IconVariable size="1.2rem" />,
      pane: <EnvironmentListPane />,
    },
  ];
};

const useActiveTab = () => {
  const { state } = useEditorContext();
  const { disabledPresenter } = useEditorContext();

  return useMemo(() => {
    if (state.selectedActivityTab === null) {
      return null;
    } else if (
      disabledPresenter &&
      !state.systemActivityTabs.includes(state.selectedActivityTab)
    ) {
      return ActivityTab.Metadatas;
    } else {
      return state.selectedActivityTab;
    }
  }, [disabledPresenter, state.selectedActivityTab, state.systemActivityTabs]);
};
