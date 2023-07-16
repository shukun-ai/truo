import {
  Box,
  Divider,
  Group,
  ScrollArea,
  Text,
  createStyles,
} from '@mantine/core';
import { useObservableState } from 'observable-hooks';

import { useAppContext } from '../../../../contexts/app-context';

import { CreateButton } from './internal/create-button';
import { MoreButton } from './internal/more-button';

export const EnvironmentListPane = () => {
  const { classes, cx } = useStyles();

  const app = useAppContext();

  const selectedEnvironmentEntityId = useObservableState(
    app.repositories.tabRepository.selectedEnvironmentEntityId$,
    null,
  );

  const allEnvironments = useObservableState(
    app.repositories.environmentRepository.all$,
    [],
  );

  return (
    <Box className={cx(classes.wrapper)}>
      <Box>
        <CreateButton />
        <Divider />
      </Box>
      <ScrollArea sx={{ flex: 1, overflow: 'hidden' }}>
        {allEnvironments.map((environmentEntity) => (
          <Box
            key={environmentEntity.id}
            className={cx(
              classes.button,
              selectedEnvironmentEntityId === environmentEntity.id &&
                classes.active,
            )}
            onClick={() => {
              app.repositories.tabRepository.previewEnvironmentTab(
                environmentEntity.environmentName,
                environmentEntity.id,
              );
            }}
          >
            <Group>
              <Text size="sm" truncate>
                {environmentEntity.environmentName}
              </Text>
            </Group>
            <MoreButton environmentEntity={environmentEntity} />
          </Box>
        ))}
      </ScrollArea>
    </Box>
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
