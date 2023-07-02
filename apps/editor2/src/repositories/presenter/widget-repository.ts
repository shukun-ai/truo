import { select } from '@ngneat/elf';
import {
  getAllEntitiesApply,
  selectAllEntities,
  updateEntities,
} from '@ngneat/elf-entities';

import { PresenterWidget, PresenterWidgets } from '@shukun/schema';

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

  update(entityId: string, entity: Partial<PresenterWidget>): void {
    this.presenterStore.update(
      updateEntities(entityId, entity, { ref: widgetRef }),
    );
  }
}
