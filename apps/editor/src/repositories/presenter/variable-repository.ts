import {
  addEntities,
  deleteEntities,
  getAllEntitiesApply,
  updateEntities,
} from '@ngneat/elf-entities';

import { presenterStore } from './presenter-store';
import {
  PresenterVariableEntity,
  createVariableEntityId,
  variableRef,
} from './variable-ref';

export const variableRepository = {
  isUniqueId: (variableId: string): boolean => {
    const existEntity = presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (item) => item.id === variableId,
        ref: variableRef,
      }),
    );

    return existEntity.length === 1;
  },

  create: (
    variableId: string,
    variable: Omit<PresenterVariableEntity, 'id'>,
  ): void => {
    presenterStore.update(
      addEntities(
        {
          ...variable,
          id: createVariableEntityId(variableId),
        },
        { ref: variableRef },
      ),
    );
  },

  update: (
    entityId: string,
    entity: Omit<PresenterVariableEntity, 'id'>,
  ): void => {
    presenterStore.update(
      updateEntities(entityId, entity, { ref: variableRef }),
    );
  },

  remove: (entityId: string): void => {
    presenterStore.update(deleteEntities(entityId, { ref: variableRef }));
  },
};
