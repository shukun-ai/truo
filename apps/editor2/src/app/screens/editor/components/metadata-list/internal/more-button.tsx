import { ActionIcon, Menu } from '@mantine/core';

import { IconDots, IconTrash } from '@tabler/icons-react';

import { MetadataEntity } from '../../../../../../repositories/metadata/metadata-ref';
import { useAppContext } from '../../../../../contexts/app-context';

export type MoreButtonProps = {
  metadataEntity: MetadataEntity;
};

export const MoreButton = ({ metadataEntity }: MoreButtonProps) => {
  const app = useAppContext();

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
            event.preventDefault();
            app.repositories.metadataRepository.remove(metadataEntity.id);
          }}
        >
          删除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
