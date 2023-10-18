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
  create: (
    processId: string,
    process: Omit<PresenterProcessEntity, 'id'>,
  ): void => {
    presenterStore.update(
      addEntities(
        {
          ...process,
          id: createProcessEntityId(processId),
        },
        { ref: processRef },
      ),
    );
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
