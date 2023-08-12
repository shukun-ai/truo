import { useMemo } from 'react';

import { TabEntity, useEditorContext } from '../../../editor-context';
import { ConnectorDetail } from '../../connector-detail/connector-detail';

export type TabConnectorProps = {
  tab: TabEntity;
};

export const TabConnector = ({ tab }: TabConnectorProps) => {
  const { state } = useEditorContext();

  const { connectors } = state;

  const connectorEntity = useMemo(() => {
    if (tab.tabType !== 'connector') {
      return null;
    }
    return connectors[tab.foreignId];
  }, [connectors, tab.foreignId, tab.tabType]);

  if (!connectorEntity) {
    return null;
  }

  return <ConnectorDetail tab={tab} connectorEntity={connectorEntity} />;
};
