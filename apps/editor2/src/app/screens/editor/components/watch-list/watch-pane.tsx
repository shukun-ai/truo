import {
  ActionIcon,
  Box,
  Divider,
  Group,
  Menu,
  ScrollArea,
  Text,
  createStyles,
} from '@mantine/core';
import { IconDots, IconTrash } from '@tabler/icons-react';
import { useObservableState } from 'observable-hooks';

import { PresenterWatchEntity } from '../../../../../repositories/presenter/watch-ref';
import { useAppContext } from '../../../../contexts/app-context';

import { ScreenTip } from '../screen-tip/screen-tip';

import { WatchCreateButton } from './watch-create-button';

export const WatchPane = () => {
  const { classes, cx } = useStyles();

  const app = useAppContext();

  const selectedWatchEntityId = useObservableState(
    app.repositories.tabRepository.selectedWatchEntityId$,
    null,
  );

  const allRepositories = useObservableState(
    app.repositories.presenterRepository.watchRepository.all$,
    [],
  );

  return (
    <Box className={cx(classes.wrapper)}>
      <ScreenTip />
      <Box>
        <WatchCreateButton />
        <Divider />
      </Box>
      <ScrollArea sx={{ flex: 1, overflow: 'hidden' }}>
        {allRepositories.map((watchEntity) => (
          <Box
            key={watchEntity.id}
            className={cx(
              classes.button,
              selectedWatchEntityId === watchEntity.id && classes.active,
            )}
            onClick={() => {
              app.repositories.tabRepository.previewWatchTab(
                watchEntity.containerName,
                watchEntity.watchName,
                watchEntity.id,
              );
            }}
          >
            <Group>
              <Text size="sm">{watchEntity.watchName}</Text>
            </Group>
            <MoreButton watchEntity={watchEntity} />
          </Box>
        ))}
      </ScrollArea>
    </Box>
  );
};

const MoreButton = ({ watchEntity }: { watchEntity: PresenterWatchEntity }) => {
  const app = useAppContext();

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
          onClick={() => {
            app.repositories.presenterRepository.watchRepository.remove(
              watchEntity.id,
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
