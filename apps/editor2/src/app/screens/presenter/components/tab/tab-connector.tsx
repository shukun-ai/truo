import { Box, Container, ScrollArea } from '@mantine/core';
import { useObservableState } from 'observable-hooks';

import { useMemo } from 'react';

import { TabEntity } from '../../../../../repositories/tab/tab-ref';
import { useAppContext } from '../../../../contexts/app-context';
import { ConnectorDetail } from '../connector-detail/connector-detail';

export type TabConnectorProps = {
  tab: TabEntity;
};

export const TabConnector = ({ tab }: TabConnectorProps) => {
  const app = useAppContext();

  const allConnectorEntities = useObservableState(
    app.repositories.connectorRepository.all$,
    [],
  );

  const connectorEntity = useMemo(() => {
    if (tab.tabType !== 'connector') {
      return null;
    }
    const { connectorName } = tab;
    if (!connectorName) {
      return null;
    }
    return allConnectorEntities.find(
      (connectorEntity) => connectorEntity.id === tab.connectorEntityId,
    );
  }, [allConnectorEntities, tab]);

  if (!connectorEntity) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          flex: 1,
          height: '100%',
          minWidth: 0,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        <ScrollArea sx={{ width: '100%', height: '100%' }}>
          <Container fluid>
            <ConnectorDetail tab={tab} connectorEntity={connectorEntity} />
          </Container>
        </ScrollArea>
      </Box>
      <Box
        sx={{
          flex: 1,
          height: '100%',
          minWidth: 0,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        <ScrollArea sx={{ width: '100%', height: '100%' }}>
          <Container fluid>Visual Section</Container>
        </ScrollArea>
      </Box>
    </Box>
  );
};
