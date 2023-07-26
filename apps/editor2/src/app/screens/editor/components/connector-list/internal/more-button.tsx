import { ActionIcon, Menu } from '@mantine/core';

import { IconDots, IconTrash } from '@tabler/icons-react';

import { ConnectorEntity } from '../../../../../../repositories/connector/connector-ref';
import { useAppContext } from '../../../../../contexts/app-context';
import { useEditorContext } from '../../../editor-context';

export type MoreButtonProps = {
  connectorEntity: ConnectorEntity;
};

export const MoreButton = ({ connectorEntity }: MoreButtonProps) => {
  const app = useAppContext();
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
            app.repositories.connectorRepository.remove(connectorEntity.id);
          }}
        >
          删除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
