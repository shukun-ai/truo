import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Menu,
  ScrollArea,
  Text,
  UnstyledButton,
  createStyles,
} from '@mantine/core';
import { PresenterSchema } from '@shukun/schema';
import { IconDots, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

export type ContainerPaneProps = {
  presenter: PresenterSchema;
};

export const ContainerPane = ({ presenter }: ContainerPaneProps) => {
  const { classes, cx } = useStyles();

  const [active] = useState('cargo-edit');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      <Box>
        <Button
          leftIcon={<IconPlus size="0.9rem" />}
          variant="subtle"
          size="sm"
          fullWidth
        >
          新建
        </Button>
        <Divider />
      </Box>
      <ScrollArea sx={{ flex: 1, overflow: 'hidden' }}>
        {Object.entries(presenter.containers).map(([containerName]) => (
          <UnstyledButton
            className={cx(
              classes.button,
              active === containerName && classes.active,
            )}
          >
            <Text size="sm">{containerName}</Text>
            <MoreButton />
          </UnstyledButton>
        ))}
      </ScrollArea>
    </Box>
  );
};

const MoreButton = () => {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="transparent">
          <IconDots size="1rem" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item color="red" icon={<IconTrash size={14} />}>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

const useStyles = createStyles((theme) => ({
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
