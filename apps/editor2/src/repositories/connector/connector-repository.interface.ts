import { Observable } from 'rxjs';

import { ConnectorEntity } from './connector-ref';

export interface IConnectorRepository {
  all$: Observable<ConnectorEntity[]>;
  count$: Observable<number>;
  initialize(): Promise<void>;
  create(connectorName: string): void;
  update(entity: ConnectorEntity): void;
  remove(entityId: string): void;
}
