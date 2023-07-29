import { ActionIcon, Menu } from '@mantine/core';
import { IconDots, IconTrash } from '@tabler/icons-react';

export type ElectronMoreButtonProps = {
  onRemove: () => void;
};

export const ElectronMoreButton = ({ onRemove }: ElectronMoreButtonProps) => {
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
          icon={<IconTrash size={14} />}
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
        >
          删除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
