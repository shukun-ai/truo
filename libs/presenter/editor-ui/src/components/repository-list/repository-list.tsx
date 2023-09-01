import { ActionIcon, Box, Group, Menu, ScrollArea, Text } from '@mantine/core';
import {
  IconBuildingWarehouse,
  IconDots,
  IconTrash,
} from '@tabler/icons-react';

import { RepositoryEntity, useEditorContext } from '../../editor-context';

import { extractTabForeignId } from '../../helpers/extract-tab-foreign-id';

import { useListStyles } from '../common/list-style';

import { RepositoryCreateButton } from './repository-create-button';

export const RepositoryList = () => {
  const { classes, cx } = useListStyles();

  const { state, dispatch } = useEditorContext();

  const { selectedTab, repositories } = state;

  return (
    <Box className={cx(classes.wrapper)}>
      <Box pl={4} pr={4} mb={8}>
        <RepositoryCreateButton />
      </Box>
      <ScrollArea sx={{ flex: 1, overflow: 'hidden' }}>
        {Object.values(repositories).map((repositoryEntity) => (
          <Box
            key={repositoryEntity.id}
            className={cx(
              classes.button,
              extractTabForeignId(selectedTab, 'repository') ===
                repositoryEntity.id && classes.active,
            )}
            onClick={() => {
              dispatch.tab.previewRepository(repositoryEntity.id);
            }}
          >
            <Group>
              <IconBuildingWarehouse size="1rem" />
              <Text size="sm">$.{repositoryEntity.id}</Text>
            </Group>
            <MoreButton repositoryEntity={repositoryEntity} />
          </Box>
        ))}
      </ScrollArea>
    </Box>
  );
};

const MoreButton = ({
  repositoryEntity,
}: {
  repositoryEntity: RepositoryEntity;
}) => {
  const { dispatch } = useEditorContext();

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
            dispatch.repository.remove(repositoryEntity.id);
          }}
        >
          删除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
