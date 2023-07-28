import { setProps } from '@ngneat/elf';
import {
  deleteEntities,
  getAllEntitiesApply,
  updateAllEntities,
} from '@ngneat/elf-entities';

import { containerRef } from './container-ref';
import { presenterStore } from './presenter-store';
import { repositoryRef } from './repository-ref';
import { PresenterScreenEntity, screenRef } from './screen-ref';
import { watchRef } from './watch-ref';
import { widgetRef } from './widget-ref';

export const removeContainer = (containerEntityId: string) => {
  const widgetIds = presenterStore.query(
    getAllEntitiesApply({
      ref: widgetRef,
      filterEntity: (entity) => entity.containerName === containerEntityId,
      mapEntity: (entity) => entity.id,
    }),
  );

  const repositoryIds = presenterStore.query(
    getAllEntitiesApply({
      ref: repositoryRef,
      filterEntity: (entity) => entity.containerName === containerEntityId,
      mapEntity: (entity) => entity.id,
    }),
  );

  const watchIds = presenterStore.query(
    getAllEntitiesApply({
      ref: watchRef,
      filterEntity: (entity) => entity.containerName === containerEntityId,
      mapEntity: (entity) => entity.id,
    }),
  );

  presenterStore.update(
    deleteEntities(containerEntityId, { ref: containerRef }),
    deleteEntities(widgetIds, { ref: widgetRef }),
    deleteEntities(repositoryIds, { ref: widgetRef }),
    deleteEntities(watchIds, { ref: widgetRef }),
    updateAllEntities((state) => removeScreenEntity(state, containerEntityId), {
      ref: screenRef,
    }),
    setProps((state) => updateSelected(state, containerEntityId)),
  );
};

const removeScreenEntity = (
  entity: PresenterScreenEntity,
  containerEntityId: string,
): PresenterScreenEntity => {
  return {
    ...entity,
    slots: updateScreenSlots(entity.slots, containerEntityId),
  };
};

const updateScreenSlots = (
  slots: { [k: string]: string },
  deletedContainerId: string,
): { [k: string]: string } => {
  return Object.entries(slots).reduce((total, [slotName, slot]) => {
    if (slot === deletedContainerId) {
      return total;
    } else {
      return {
        ...total,
        [slotName]: slot,
      };
    }
  }, {} as { [k: string]: string });
};

const updateSelected = (
  state: (typeof presenterStore)['state'],
  containerEntityId: string,
): (typeof presenterStore)['state'] => {
  if (state.selectedContainerEntityId === containerEntityId) {
    return {
      ...state,
      selectedContainerEntityId: null,
      selectedScreenEntityId: null,
    };
  } else {
    return state;
  }
};
