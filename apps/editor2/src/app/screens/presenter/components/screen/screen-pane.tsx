import {
  ActionIcon,
  Badge,
  Box,
  Divider,
  Group,
  Menu,
  ScrollArea,
  Text,
  createStyles,
} from '@mantine/core';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import { useObservableState } from 'observable-hooks';

import { SCREEN_HOME_PAGE_ID } from '../../../../../repositories/presenter/presenter-store';
import { PresenterScreenEntity } from '../../../../../repositories/presenter/screen-ref';
import { useAppContext } from '../../../../contexts/app-context';

import { ScreenCreateButton } from './screen-create-button';
import { useScreenEditButton } from './use-screen-edit-button';

export const ScreenPane = () => {
  const { classes, cx } = useStyles();

  const app = useAppContext();

  const selectedScreenEntityId = useObservableState(
    app.repositories.presenterRepository.screenRepository
      .selectedScreenEntityId$,
    null,
  );

  const allScreens = useObservableState(
    app.repositories.presenterRepository.screenRepository.all$,
    [],
  );

  return (
    <Box className={cx(classes.wrapper)}>
      <Box>
        <ScreenCreateButton />
        <Divider />
      </Box>
      <ScrollArea sx={{ flex: 1, overflow: 'hidden' }}>
        {allScreens.map((screen) => (
          <Box
            key={screen.id}
            className={cx(
              classes.button,
              selectedScreenEntityId === screen.id && classes.active,
            )}
            onClick={() => {
              app.repositories.presenterRepository.screenRepository.select(
                screen.id,
              );
            }}
          >
            <Group>
              <Text size="sm">{screen.id}</Text>
              <Badge>{screen.id === SCREEN_HOME_PAGE_ID && '首页'}</Badge>
            </Group>
            <MoreButton screenId={screen.id} screen={screen} />
          </Box>
        ))}
      </ScrollArea>
    </Box>
  );
};

const MoreButton = ({
  screenId,
  screen,
}: {
  screenId: string;
  screen: PresenterScreenEntity;
}) => {
  const app = useAppContext();

  const { open } = useScreenEditButton({ screenEntity: screen });

  return (
    <Menu shadow="md" width={200}>
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
              screenId,
            );
          }}
          disabled={screenId === SCREEN_HOME_PAGE_ID}
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
