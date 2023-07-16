import { Box, Divider, Tabs, Tooltip, createStyles } from '@mantine/core';
import {
  IconRoute,
  IconBinaryTree,
  IconBuildingWarehouse,
  IconAtom2Filled,
  IconGizmo,
  IconShieldLock,
  Icon3dCubeSphere,
  IconVariable,
} from '@tabler/icons-react';

import { ConnectorListPane } from './connector-list/connector-list-pane';
import { ContainerPane } from './container/container-pane';
import { EnvironmentListPane } from './environment-list/environment-list-pane';
import { MetadataListPane } from './metadata-list/metadata-list-pane';
import { RepositoryPane } from './repository-pane/repository-pane';
import { ScreenPane } from './screen/screen-pane';
import { TreePane } from './tree/tree-pane';
import { WatchPane } from './watch-pane/watch-pane';

export const ScreenTool = () => {
  const { classes, cx } = useStyles();

  return (
    <Tabs
      defaultValue="widgets"
      className={cx(classes.wrapper)}
      orientation="vertical"
    >
      <Tabs.List className={cx(classes.tabs)}>
        <Tooltip label="路由" position="right">
          <Tabs.Tab value="screens" icon={<IconRoute size="0.95rem" />} />
        </Tooltip>
        <Tooltip label="组件树" position="right">
          <Tabs.Tab value="widgets" icon={<IconBinaryTree size="0.95rem" />} />
        </Tooltip>
        <Tooltip label="数据仓库" position="right">
          <Tabs.Tab
            value="repositories"
            icon={<IconBuildingWarehouse size="0.95rem" />}
          />
        </Tooltip>
        <Tooltip label="观察器" position="right">
          <Tabs.Tab
            value="watches"
            icon={<Icon3dCubeSphere size="0.95rem" />}
          />
        </Tooltip>
        <Tooltip label="元数据" position="right">
          <Tabs.Tab
            value="metadata"
            icon={<IconAtom2Filled size="0.95rem" />}
          />
        </Tooltip>
        <Tooltip label="函数流" position="right">
          <Tabs.Tab value="connectors" icon={<IconGizmo size="0.95rem" />} />
        </Tooltip>
        <Tooltip label="环境变量" position="right">
          <Tabs.Tab
            value="environments"
            icon={<IconVariable size="0.95rem" />}
          />
        </Tooltip>
        <Tooltip label="权限" position="right">
          <Tabs.Tab
            value="permissions"
            icon={<IconShieldLock size="0.95rem" />}
          />
        </Tooltip>
      </Tabs.List>

      <Tabs.Panel value="screens" className={cx(classes.panel)}>
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
          <ScreenPane />
        </Box>
      </Tabs.Panel>

      <Tabs.Panel value="widgets" className={cx(classes.panel)}>
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
      </Tabs.Panel>

      <Tabs.Panel value="repositories" className={cx(classes.panel)}>
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
      </Tabs.Panel>

      <Tabs.Panel value="watches" className={cx(classes.panel)}>
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
      </Tabs.Panel>

      <Tabs.Panel value="metadata" className={cx(classes.panel)}>
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
          <MetadataListPane />
        </Box>
      </Tabs.Panel>

      <Tabs.Panel value="connectors" className={cx(classes.panel)}>
        <ConnectorListPane />
      </Tabs.Panel>

      <Tabs.Panel value="environments" className={cx(classes.panel)}>
        <EnvironmentListPane />
      </Tabs.Panel>
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
    flex: 1,
    overflow: 'hidden',
  },
}));
