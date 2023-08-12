import { ActionIcon, Menu } from '@mantine/core';

import { IconDots, IconTrash } from '@tabler/icons-react';

import { useMemo } from 'react';

import { MetadataEntity, useEditorContext } from '../../../editor-context';

export type MoreButtonProps = {
  metadataEntity: MetadataEntity;
};

export const MoreButton = ({ metadataEntity }: MoreButtonProps) => {
  const { dispatch } = useEditorContext();
  const { disabledSystem } = useEditorContext();

  const disabled = useMemo(() => {
    return metadataEntity.id.startsWith('system__') ? true : disabledSystem;
  }, [disabledSystem, metadataEntity.id]);

  if (disabled) {
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
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            dispatch.metadata.remove(metadataEntity.id);
          }}
        >
          删除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
