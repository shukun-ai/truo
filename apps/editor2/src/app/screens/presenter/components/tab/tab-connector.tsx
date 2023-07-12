import { Container, ScrollArea } from '@mantine/core';
import { useObservableState } from 'observable-hooks';

import { useMemo } from 'react';

import { TabEntity } from '../../../../../repositories/tab/tab-ref';
import { useAppContext } from '../../../../contexts/app-context';

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
    <ScrollArea sx={{ width: '100%', height: '100%' }}>
      <Container fluid>
        {/* <WatchForm tab={tab} connectorEntity={connectorEntity} /> */}
        connector
      </Container>
    </ScrollArea>
  );
};
