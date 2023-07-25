import { ActionIcon, Menu } from '@mantine/core';

import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';

import { SCREEN_HOME_PAGE_ID } from '../../../../../../repositories/presenter/presenter-store';
import { PresenterScreenEntity } from '../../../../../../repositories/presenter/screen-ref';
import { useAppContext } from '../../../../../contexts/app-context';

import { useScreenEditButton } from './use-screen-edit-button';

export const MoreButton = ({ screen }: { screen: PresenterScreenEntity }) => {
  const app = useAppContext();

  const { open } = useScreenEditButton({ screenEntity: screen });

  return (
    <Menu trigger="hover" shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="transparent">
          <IconDots size="1rem" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconEdit size={14} />} onClick={open}>
          编辑
        </Menu.Item>
        <Menu.Item
          color="red"
          icon={<IconTrash size={14} />}
          onClick={() => {
            app.repositories.presenterRepository.screenRepository.remove(
              screen.id,
            );
          }}
          disabled={screen.id === SCREEN_HOME_PAGE_ID}
        >
          删除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
