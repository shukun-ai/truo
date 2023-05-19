import { Tabs } from '@mantine/core';
import { IconRoute, IconBoxPadding, IconBinaryTree } from '@tabler/icons-react';

export type ScreenToolProps = {
  //
};

export const ScreenTool = () => {
  return (
    <Tabs defaultValue="screens">
      <Tabs.List>
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

      <Tabs.Panel value="screens" pt="xs">
        Gallery tab content
      </Tabs.Panel>

      <Tabs.Panel value="containers" pt="xs">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="tree" pt="xs">
        Messages tab content
      </Tabs.Panel>
    </Tabs>
  );
};
