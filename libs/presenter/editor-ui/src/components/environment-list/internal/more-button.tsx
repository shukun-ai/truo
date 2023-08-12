import { ActionIcon, Menu } from '@mantine/core';

import { IconDots, IconTrash } from '@tabler/icons-react';

import { EnvironmentEntity, useEditorContext } from '../../../editor-context';

export type MoreButtonProps = {
  environmentEntity: EnvironmentEntity;
};

export const MoreButton = ({ environmentEntity }: MoreButtonProps) => {
  const { dispatch } = useEditorContext();

  const { disabledSystem } = useEditorContext();

  if (disabledSystem) {
    return null;
  }

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
          onClick={() => {
            dispatch.environment.remove(environmentEntity.id);
          }}
        >
          删除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
