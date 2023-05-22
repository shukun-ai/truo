import { Tabs, createStyles } from '@mantine/core';
import { PresenterSchema } from '@shukun/schema';
import { IconRoute, IconBoxPadding, IconBinaryTree } from '@tabler/icons-react';

import { ContainerPane } from './screen/container-pane';
import { TreePane } from './tree/tree-pane';

export type ScreenToolProps = {
  presenter: PresenterSchema;
};

export const ScreenTool = ({ presenter }: ScreenToolProps) => {
  const { classes, cx } = useStyles();

  return (
    <Tabs defaultValue="screens" className={cx(classes.wrapper)}>
      <Tabs.List className={cx(classes.tabs)}>
        <Tabs.Tab value="screens" icon={<IconRoute size="0.8rem" />}>
          路由
        </Tabs.Tab>
        <Tabs.Tab value="containers" icon={<IconBoxPadding size="0.8rem" />}>
          容器
        </Tabs.Tab>
        <Tabs.Tab value="tree" icon={<IconBinaryTree size="0.8rem" />}>
          组件树
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="screens" className={cx(classes.panel)}>
        Gallery tab content
      </Tabs.Panel>

      <Tabs.Panel value="containers" className={cx(classes.panel)}>
        <ContainerPane presenter={presenter} />
      </Tabs.Panel>

      <Tabs.Panel value="tree" className={cx(classes.panel)}>
        <TreePane />
      </Tabs.Panel>
    </Tabs>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: '100%',
  },
  tabs: {},
  panel: {
    flex: 1,
    overflow: 'hidden',
  },
}));
