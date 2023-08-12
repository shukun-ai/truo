import { ActionIcon, Menu } from '@mantine/core';
import { IconDots, IconPlus, IconTrash } from '@tabler/icons-react';

export type MoreButtonProps = {
  //
};

export const MoreButton = () => {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="transparent">
          <IconDots size="1rem" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          color="red"
          icon={<IconPlus size={14} />}
          onClick={(event) => {
            //
          }}
        >
          插入下一个
        </Menu.Item>
        <Menu.Item
          color="red"
          icon={<IconTrash size={14} />}
          onClick={(event) => {
            //
          }}
        >
          删除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
