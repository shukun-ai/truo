import {
  ActionIcon,
  Box,
  Group,
  Menu,
  ScrollArea,
  Text,
  createStyles,
} from '@mantine/core';
import {
  IconBuildingWarehouse,
  IconDots,
  IconTrash,
} from '@tabler/icons-react';

import { RepositoryEntity, useEditorContext } from '../../editor-context';

import { RepositoryCreateButton } from './repository-create-button';

export const RepositoryList = () => {
  const { classes, cx } = useStyles();

  const { state, dispatch } = useEditorContext();

  const { selectedRepositoryEntityId, repositories } = state;

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
              selectedRepositoryEntityId === repositoryEntity.id &&
                classes.active,
            )}
            onClick={() => {
              dispatch.tab.previewRepository(repositoryEntity.id);
            }}
          >
            <Group>
              <IconBuildingWarehouse size="1rem" />
              <Text size="sm">{repositoryEntity.id}</Text>
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

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: '100%',
  },
  button: {
    display: 'flex',
    width: '100%',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: theme.defaultRadius,
    cursor: 'pointer',
    '&:hover': {
      background: theme.colors.blue[1],
    },
  },
  active: {
    background: theme.colors.blue[8],
    color: theme.white,
    '&:hover': {
      background: theme.colors.blue[8],
    },
  },
}));
