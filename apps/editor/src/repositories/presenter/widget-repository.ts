import { select } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  getAllEntitiesApply,
  updateEntities,
} from '@ngneat/elf-entities';

import { presenterStore } from './presenter-store';
import { PresenterWidgetEntity, widgetRef } from './widget-ref';

export const widgetRepository = {
  presenter$: presenterStore.pipe(select((state) => state)),

  create(entity: PresenterWidgetEntity): void {
    this.validateLabel(entity.label);
    presenterStore.update(addEntities(entity, { ref: widgetRef }));
  },

  update(entityId: string, entity: Partial<PresenterWidgetEntity>): void {
    presenterStore.update(updateEntities(entityId, entity, { ref: widgetRef }));
  },

  remove(entityId: string): void {
    presenterStore.update(deleteEntities(entityId, { ref: widgetRef }));
  },

  rename(entityId: string, label: string): void {
    this.validateLabel(label);
    presenterStore.update(
      updateEntities(entityId, { label }, { ref: widgetRef }),
    );
  },

  getLabels(label: string): string[] {
    const labels = presenterStore.query(
      getAllEntitiesApply({
        ref: widgetRef,
        filterEntity: (entity) => entity.label === label,
        mapEntity: (entity) => entity.label,
      }),
    );
    return labels;
  },

  validateLabel(label: string): void {
    const duplicated = this.getLabels(label).length > 0;
    if (duplicated) {
      throw Error('The label is duplicated.');
    }
  },
};
