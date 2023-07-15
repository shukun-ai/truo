import {
  addEntities,
  deleteEntities,
  selectAllEntities,
  setEntities,
  updateEntities,
} from '@ngneat/elf-entities';

import { Observable } from 'rxjs';

import { ApiRequester } from '../../apis/requester';

import {
  ConnectorEntity,
  connectorRef,
  createConnectorEntityId,
} from './connector-ref';
import { IConnectorRepository } from './connector-repository.interface';
import { connectorStore } from './connector-store';

export class ConnectorRepository implements IConnectorRepository {
  private readonly connectorStore = connectorStore;

  all$: Observable<ConnectorEntity[]> = this.connectorStore.pipe(
    selectAllEntities({ ref: connectorRef }),
  );

  constructor(private readonly apiRequester: ApiRequester) {}

  async initialize() {
    const response =
      await this.apiRequester.developerRequester.pullConnectors();

    const entities: ConnectorEntity[] = Object.entries(response.data.value).map(
      ([connectorName, connector]) => ({
        id: createConnectorEntityId(connectorName),
        connectorName,
        ...connector,
      }),
    );
    this.connectorStore.update(setEntities(entities, { ref: connectorRef }));
  }

  create(connectorName: string): void {
    const entity: ConnectorEntity = {
      id: createConnectorEntityId(connectorName),
      connectorName,
      label: 'connectorName',
      start: 'example',
      tasks: {
        example: {
          type: 'transformer',
          parameters: {
            data: 'welcome to connector!',
          },
        },
      },
    };
    this.connectorStore.update(addEntities(entity, { ref: connectorRef }));
  }

  update(entity: ConnectorEntity): void {
    this.connectorStore.update(
      updateEntities(
        entity.id,
        {
          ...entity,
        },
        { ref: connectorRef },
      ),
    );
  }

  remove(entityId: string): void {
    this.connectorStore.update(deleteEntities(entityId, { ref: connectorRef }));
  }
}
