import {
  ActionIcon,
  Box,
  Divider,
  Menu,
  ScrollArea,
  Text,
  createStyles,
} from '@mantine/core';
import { IconDots, IconTrash } from '@tabler/icons-react';
import { useObservableState } from 'observable-hooks';

import { useAppContext } from '../../../../contexts/app-context';

import { ScreenCreateButton } from './screen-create-button';

export const ScreenPane = () => {
  const { classes, cx } = useStyles();

  const app = useAppContext();

  const selectedScreenId = useObservableState(
    app.repositories.presenterRepository.screenRepository.selectedScreenId$,
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
              selectedScreenId === screen.id && classes.active,
            )}
            onClick={() => {
              app.repositories.presenterRepository.screenRepository.select(
                screen.id,
              );
            }}
          >
            <Text size="sm">{screen.id}</Text>
            <MoreButton screenId={screen.id} />
          </Box>
        ))}
      </ScrollArea>
    </Box>
  );
};

const MoreButton = ({ screenId }: { screenId: string }) => {
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
            app.repositories.presenterRepository.screenRepository.remove(
              screenId,
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
