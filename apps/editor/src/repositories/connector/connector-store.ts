import { createStore, withProps } from '@ngneat/elf';

import { withConnector } from './connector-ref';

export type ConnectorProps = {
  initialized: boolean;
  selectedConnectorId: string | null;
};

export const connectorStore = createStore(
  { name: 'connector' },
  withProps<ConnectorProps>({
    initialized: false,
    selectedConnectorId: null,
  }),
  withConnector(),
);
