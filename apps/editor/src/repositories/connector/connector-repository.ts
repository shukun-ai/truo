import { select } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  selectEntitiesCount,
  setEntities,
  updateEntities,
} from '@ngneat/elf-entities';

import { IApiRequester } from '../../apis/requester.interface';

import {
  ConnectorEntity,
  connectorRef,
  createConnectorEntityId,
} from './connector-ref';
import { connectorStore } from './connector-store';

export const connectorRepository = {
  all$: connectorStore.pipe(select((state) => state.connectorEntities)),

  count$: connectorStore.pipe(selectEntitiesCount({ ref: connectorRef })),

  initialize: async (apiRequester: IApiRequester) => {
    const response = await apiRequester.developerRequester.pullConnectors();

    const entities: ConnectorEntity[] = Object.entries(response.data.value).map(
      ([connectorName, connector]) => ({
        id: createConnectorEntityId(connectorName),
        connectorName,
        ...connector,
      }),
    );
    connectorStore.update(setEntities(entities, { ref: connectorRef }));
  },

  create: (connectorName: string): void => {
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
    connectorStore.update(addEntities(entity, { ref: connectorRef }));
  },

  update: (entity: ConnectorEntity): void => {
    connectorStore.update(
      updateEntities(
        entity.id,
        {
          ...entity,
        },
        { ref: connectorRef },
      ),
    );
  },

  remove: (entityId: string): void => {
    connectorStore.update(deleteEntities(entityId, { ref: connectorRef }));
  },
};
