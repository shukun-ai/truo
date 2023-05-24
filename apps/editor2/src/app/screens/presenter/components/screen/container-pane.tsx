import {
  ActionIcon,
  Box,
  Divider,
  Menu,
  ScrollArea,
  Text,
  createStyles,
} from '@mantine/core';
import { PresenterSchema } from '@shukun/schema';
import { IconDots, IconTrash } from '@tabler/icons-react';
import { useObservableState } from 'observable-hooks';

import { useAppContext } from '../../../../contexts/app-context';

import { ContainerCreateButton } from './container-create-button';

export type ContainerPaneProps = {
  presenter: PresenterSchema;
};

export const ContainerPane = ({ presenter }: ContainerPaneProps) => {
  const { classes, cx } = useStyles();

  const app = useAppContext();

  const selectedContainerId = useObservableState(
    app.repositories.presenterRepository.selectedContainerId$,
    null,
  );

  return (
    <Box className={cx(classes.wrapper)}>
      <Box>
        <ContainerCreateButton
          onSubmit={(values) => {
            app.repositories.presenterRepository.createContainer(values.text);
          }}
        />
        <Divider />
      </Box>
      <ScrollArea sx={{ flex: 1, overflow: 'hidden' }}>
        {Object.entries(presenter.containers).map(([containerId]) => (
          <Box
            key={containerId}
            className={cx(
              classes.button,
              selectedContainerId === containerId && classes.active,
            )}
            onClick={() => {
              app.repositories.presenterRepository.selectContainer(containerId);
            }}
          >
            <Text size="sm">{containerId}</Text>
            <MoreButton containerId={containerId} />
          </Box>
        ))}
      </ScrollArea>
    </Box>
  );
};

const MoreButton = ({ containerId }: { containerId: string }) => {
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
            app.repositories.presenterRepository.removeContainer(containerId);
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
