import {
  addEntities,
  deleteEntities,
  getAllEntitiesApply,
  updateEntities,
} from '@ngneat/elf-entities';

import { presenterStore } from './presenter-store';
import {
  PresenterRepositoryEntity,
  createRepositoryEntityId,
  repositoryRef,
} from './repository-ref';

export const repositoryRepository = {
  isUniqueId: (repositoryId: string): boolean => {
    const existEntity = presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (item) => item.id === repositoryId,
        ref: repositoryRef,
      }),
    );

    return existEntity.length === 1;
  },

  create: (
    repositoryId: string,
    repository: Omit<PresenterRepositoryEntity, 'id'>,
  ): void => {
    presenterStore.update(
      addEntities(
        {
          ...repository,
          id: createRepositoryEntityId(repositoryId),
        },
        { ref: repositoryRef },
      ),
    );
  },

  update: (
    entityId: string,
    entity: Omit<PresenterRepositoryEntity, 'id'>,
  ): void => {
    presenterStore.update(
      updateEntities(entityId, entity, { ref: repositoryRef }),
    );
  },

  remove: (entityId: string): void => {
    presenterStore.update(deleteEntities(entityId, { ref: repositoryRef }));
  },
};
