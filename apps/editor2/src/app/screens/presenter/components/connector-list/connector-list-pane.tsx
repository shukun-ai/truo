import {
  Badge,
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

export const ConnectorListPane = () => {
  const { classes, cx } = useStyles();

  const app = useAppContext();

  const selectedConnectorEntityId = null;

  const allConnectors = useObservableState(
    app.repositories.connectorRepository.all$,
    [],
  );

  return (
    <Box className={cx(classes.wrapper)}>
      <Box>
        <CreateButton />
        <Divider />
      </Box>
      <ScrollArea sx={{ flex: 1, overflow: 'hidden' }}>
        {allConnectors.map((connectorEntity) => (
          <Box
            key={connectorEntity.id}
            className={cx(
              classes.button,
              selectedConnectorEntityId === connectorEntity.id &&
                classes.active,
            )}
            onClick={() => {
              app.repositories.tabRepository.previewConnectorTab(
                connectorEntity.connectorName,
                connectorEntity.id,
              );
            }}
          >
            <Group>
              <Text size="sm">{connectorEntity.connectorName}</Text>
              <Badge
                variant="gradient"
                gradient={{ from: 'orange', to: 'red' }}
              >
                可访问
              </Badge>
            </Group>
            <MoreButton connectorEntity={connectorEntity} />
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
