import {
  addEntities,
  deleteEntities,
  updateEntities,
} from '@ngneat/elf-entities';

import { presenterStore } from './presenter-store';
import {
  PresenterProcessEntity,
  createProcessEntityId,
  processRef,
} from './process-ref';

export const processRepository = {
  create: (process: Omit<PresenterProcessEntity, 'id'>): string => {
    const id = createProcessEntityId();
    presenterStore.update(
      addEntities(
        {
          ...process,
          id,
        },
        { ref: processRef },
      ),
    );
    return id;
  },

  update: (
    entityId: string,
    entity: Omit<PresenterProcessEntity, 'id'>,
  ): void => {
    presenterStore.update(
      updateEntities(entityId, entity, { ref: processRef }),
    );
  },

  remove: (entityId: string): void => {
    presenterStore.update(deleteEntities(entityId, { ref: processRef }));
  },
};
