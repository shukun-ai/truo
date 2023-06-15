import { Box, Divider, Tabs, Tooltip, createStyles } from '@mantine/core';
import {
  IconRoute,
  IconBinaryTree,
  IconBuildingWarehouse,
  IconAtom2Filled,
  IconGizmo,
  IconShieldLock,
} from '@tabler/icons-react';

import { ContainerPane } from './container/container-pane';
import { ScreenPane } from './screen/screen-pane';
import { TreePane } from './tree/tree-pane';

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
        <Tooltip label="元数据" position="right">
          <Tabs.Tab
            value="metadata"
            icon={<IconAtom2Filled size="0.95rem" />}
          />
        </Tooltip>
        <Tooltip label="函数流" position="right">
          <Tabs.Tab value="flows" icon={<IconGizmo size="0.95rem" />} />
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
