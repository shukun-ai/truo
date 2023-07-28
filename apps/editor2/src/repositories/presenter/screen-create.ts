import { addEntities, getAllEntitiesApply } from '@ngneat/elf-entities';
import { getUniqueLabel } from '@shukun/util-functions';
import { nanoid } from 'nanoid';

import { PresenterContainerEntity, containerRef } from './container-ref';
import { presenterStore } from './presenter-store';
import { PresenterScreenEntity, screenRef } from './screen-ref';

export const autoCreatingValue = '$$$$$__auto_creating';

export const createScreen = (screen: PresenterScreenEntity) => {
  const existContainerLabels = presenterStore.query(
    getAllEntitiesApply({
      ref: containerRef,
      mapEntity: (entity) => entity.label,
    }),
  );

  const containerIds: string[] = [];

  const newSlots = Object.entries(screen.slots).reduce(
    (total, [slotName, slot]) => {
      let newSlot = slot;
      if (slot === autoCreatingValue) {
        const containerId = nanoid();
        newSlot = containerId;
        containerIds.push(newSlot);
      }

      return {
        ...total,
        [slotName]: newSlot,
      };
    },
    {} as { [k: string]: string },
  );

  presenterStore.update(
    addEntities(
      createContainers(containerIds, screen.screenName, existContainerLabels),
      { ref: containerRef },
    ),
    addEntities(
      {
        ...screen,
        slots: newSlots,
      },
      { ref: screenRef },
    ),
  );
};

const createContainers = (
  containerIds: string[],
  label: string,
  existContainerLabels: string[],
): PresenterContainerEntity[] => {
  return containerIds.map((containerId) => ({
    id: containerId,
    containerName: containerId,
    type: 'page',
    label: getUniqueLabel(label, existContainerLabels),
    tree: {
      root: [],
    },
  }));
};
