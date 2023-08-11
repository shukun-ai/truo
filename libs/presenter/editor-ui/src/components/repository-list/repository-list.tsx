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
import { useObservableState } from 'observable-hooks';

import { ScreenTip } from '../screen-tip/screen-tip';

import { RepositoryCreateButton } from './repository-create-button';

export const RepositoryList = () => {
  const { classes, cx } = useStyles();

  const app = useAppContext();

  const selectedRepositoryEntityId = useObservableState(
    app.repositories.tabRepository.selectedRepositoryEntityId$,
    null,
  );

  const allRepositories = useObservableState(
    app.repositories.presenterRepository.repositoryRepository.all$,
    [],
  );

  return (
    <Box className={cx(classes.wrapper)}>
      <ScreenTip />
      <Box pl={4} pr={4} mb={8}>
        <RepositoryCreateButton />
      </Box>
      {allRepositories.length === 0 && <NonContainerTip />}
      <ScrollArea sx={{ flex: 1, overflow: 'hidden' }}>
        {allRepositories.map((repositoryEntity) => (
          <Box
            key={repositoryEntity.id}
            className={cx(
              classes.button,
              selectedRepositoryEntityId === repositoryEntity.id &&
                classes.active,
            )}
            onClick={() => {
              app.repositories.tabRepository.previewRepositoryTab(
                repositoryEntity.containerName,
                repositoryEntity.repositoryName,
                repositoryEntity.id,
              );
            }}
          >
            <Group>
              <IconBuildingWarehouse size="1rem" />
              <Text size="sm">{repositoryEntity.repositoryName}</Text>
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
  repositoryEntity: PresenterRepositoryEntity;
}) => {
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
          onClick={() => {
            app.repositories.presenterRepository.repositoryRepository.remove(
              repositoryEntity.id,
            );
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
