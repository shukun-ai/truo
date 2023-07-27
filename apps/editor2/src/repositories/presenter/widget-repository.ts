import { select } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  getAllEntitiesApply,
  selectAllEntities,
  updateEntities,
} from '@ngneat/elf-entities';

import { Observable, distinctUntilChanged, map } from 'rxjs';

import { presenterStore } from './presenter-store';
import { PresenterWidgetEntity, widgetRef } from './widget-ref';
import { IWidgetRepository } from './widget-repository.interface';

export class WidgetRepository implements IWidgetRepository {
  private readonly presenterStore = presenterStore;

  allWidgets$: Observable<PresenterWidgetEntity[]> = this.presenterStore.pipe(
    selectAllEntities({ ref: widgetRef }),
  );

  selectedWidgetEntities$: Observable<Record<string, PresenterWidgetEntity>> =
    this.presenterStore
      .combine({
        selectedContainerEntityId: this.presenterStore.pipe(
          select((state) => state.selectedContainerEntityId),
        ),
        widgets: this.presenterStore.pipe(
          selectAllEntities({ ref: widgetRef }),
        ),
      })
      .pipe(
        map(({ selectedContainerEntityId }) => {
          return this.presenterStore.query(
            getAllEntitiesApply({
              filterEntity: (entity) =>
                entity.containerName === selectedContainerEntityId,
              ref: widgetRef,
            }),
          );
        }),
        map((widgets) => {
          const selectedWidgets: Record<string, PresenterWidgetEntity> = {};
          widgets.forEach((widget) => {
            selectedWidgets[widget.id] = widget;
          });
          return selectedWidgets;
        }),
        distinctUntilChanged((previous, current) => {
          // TODO add distinctObjectUntilChanged
          return JSON.stringify(previous) === JSON.stringify(current);
        }),
      );

  create(entity: PresenterWidgetEntity): void {
    this.validateLabel(entity.containerName, entity.label);
    this.presenterStore.update(addEntities(entity, { ref: widgetRef }));
  }

  update(entityId: string, entity: Partial<PresenterWidgetEntity>): void {
    this.presenterStore.update(
      updateEntities(entityId, entity, { ref: widgetRef }),
    );
  }

  remove(entityId: string): void {
    this.presenterStore.update(deleteEntities(entityId, { ref: widgetRef }));
  }

  rename(entityId: string, containerName: string, label: string): void {
    this.validateLabel(containerName, label);
    this.presenterStore.update(
      updateEntities(entityId, { label }, { ref: widgetRef }),
    );
  }

  getLabels(containerName: string, label: string): string[] {
    const labels = this.presenterStore.query(
      getAllEntitiesApply({
        ref: widgetRef,
        filterEntity: (entity) =>
          entity.containerName === containerName && entity.label === label,
        mapEntity: (entity) => entity.label,
      }),
    );
    return labels;
  }

  validateLabel(containerName: string, label: string): void {
    const duplicated = this.getLabels(containerName, label).length > 0;
    if (duplicated) {
      throw Error('The label is duplicated.');
    }
  }
}
