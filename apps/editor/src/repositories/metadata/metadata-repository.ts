import { select, setProps } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  selectEntitiesCount,
  setEntities,
  updateEntities,
} from '@ngneat/elf-entities';

import { IApiRequester } from '../../apis/requester.interface';

import {
  MetadataEntity,
  metadataRef,
  createMetadataEntityId,
} from './metadata-ref';
import { metadataStore } from './metadata-store';

export const metadataRepository = {
  all$: metadataStore.pipe(select((state) => state.metadataEntities)),

  count$: metadataStore.pipe(selectEntitiesCount({ ref: metadataRef })),

  allowedFieldType$: metadataStore.pipe(
    select((state) => state.allowedFieldType),
  ),

  initialize: async (apiRequester: IApiRequester) => {
    const response = await apiRequester.developerRequester.pullMetadatas();

    const entities: MetadataEntity[] = Object.entries(response.data.value).map(
      ([metadataName, metadata]) => ({
        id: createMetadataEntityId(metadataName),
        metadataName,
        ...metadata,
      }),
    );
    metadataStore.update(
      setEntities(entities, { ref: metadataRef }),
      setProps(() => ({
        initialized: true,
      })),
    );
  },

  create: (metadataName: string): void => {
    const entity: MetadataEntity = {
      id: createMetadataEntityId(metadataName),
      metadataName,
      label: metadataName,
      electrons: {},
    };
    metadataStore.update(addEntities(entity, { ref: metadataRef }));
  },

  update: (entity: MetadataEntity): void => {
    metadataStore.update(
      updateEntities(
        entity.id,
        {
          ...entity,
        },
        { ref: metadataRef },
      ),
    );
  },

  remove: (entityId: string): void => {
    metadataStore.update(deleteEntities(entityId, { ref: metadataRef }));
  },
};
