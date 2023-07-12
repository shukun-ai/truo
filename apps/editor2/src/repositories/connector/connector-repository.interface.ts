import { ConnectorEntity } from './connector-ref';

export interface IConnectorRepository {
  initialize(presenterName: string): Promise<void>;

  create(connectorName: string): void;
  update(entity: ConnectorEntity): void;
  remove(entityId: string): void;
}
