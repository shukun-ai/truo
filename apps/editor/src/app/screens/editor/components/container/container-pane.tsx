import {
  ActionIcon,
  Box,
  Container,
  Divider,
  Menu,
  ScrollArea,
  Text,
  createStyles,
} from '@mantine/core';
import { IconDots, IconTrash } from '@tabler/icons-react';
import { useObservableState } from 'observable-hooks';

import { useState } from 'react';

import { useAppContext } from '../../../../contexts/app-context';

import { ContainerCreateButton } from './container-create-button';

export const ContainerPane = () => {
  const { classes, cx } = useStyles();

  const app = useAppContext();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const allContainers = useObservableState(
    app.repositories.presenterRepository.containerRepository.all$,
    [],
  );

  return (
    <Box className={cx(classes.wrapper)}>
      <Box>
        <ContainerCreateButton />
        <Divider />
      </Box>
      <ScrollArea sx={{ flex: 1, overflow: 'hidden' }}>
        <Container fluid mt={12} mb={12}>
          {allContainers.map((container) => (
            <Box
              key={container.id}
              className={cx(
                classes.button,
                selectedId === container.id && classes.active,
              )}
              onClick={() => {
                setSelectedId(container.id);
              }}
            >
              <Text size="sm">{container.label}</Text>
              <MoreButton containerName={container.id} />
            </Box>
          ))}
        </Container>
      </ScrollArea>
    </Box>
  );
};

const MoreButton = ({ containerName }: { containerName: string }) => {
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
            app.repositories.presenterRepository.containerRepository.remove(
              containerName,
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
