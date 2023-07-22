import { ActionIcon, Menu } from '@mantine/core';
import { IconDots, IconTrash } from '@tabler/icons-react';

export type TaskMoreButtonProps = {
  onRemove: () => void;
  disabled?: boolean;
};

export const TaskMoreButton = ({ onRemove, disabled }: TaskMoreButtonProps) => {
  if (disabled) {
    return null;
  }

  return (
    <Menu trigger="hover" shadow="md" width={200}>
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
