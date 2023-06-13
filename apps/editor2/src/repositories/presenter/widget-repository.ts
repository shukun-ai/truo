import { select } from '@ngneat/elf';
import {
  getAllEntitiesApply,
  selectAllEntities,
  updateEntities,
  upsertEntities,
} from '@ngneat/elf-entities';

import {
  PresenterSchema,
  PresenterWidget,
  PresenterWidgets,
} from '@shukun/schema';

import { Observable, distinctUntilChanged, map } from 'rxjs';

import { presenterStore } from './presenter-store';
import { PresenterWidgetEntity, widgetRef } from './widget-ref';
import { IWidgetRepository } from './widget-repository.interface';

export class WidgetRepository implements IWidgetRepository {
  private readonly presenterStore = presenterStore;

  allWidgets$: Observable<PresenterWidgetEntity[]> = this.presenterStore.pipe(
    selectAllEntities({ ref: widgetRef }),
  );

  selectedWidgets$: Observable<PresenterWidgets> = this.presenterStore
    .combine({
      selectedContainerId: this.presenterStore.pipe(
        select((state) => state.selectedContainerId),
      ),
      widgets: this.presenterStore.pipe(selectAllEntities({ ref: widgetRef })),
    })
    .pipe(
      map(({ selectedContainerId }) => {
        return this.presenterStore.query(
          getAllEntitiesApply({
            filterEntity: (entity) =>
              entity.containerId === selectedContainerId,
            ref: widgetRef,
          }),
        );
      }),
      map((widgets) => {
        const selectedWidgets: PresenterWidgets = {};
        widgets.forEach((widget) => {
          selectedWidgets[widget.id] = widget;
        });
        return selectedWidgets;
      }),
      distinctUntilChanged(),
    );

  upsertByContainer(presenter: PresenterSchema): void {
    const widgetEntities: PresenterWidgetEntity[] = [];

    for (const [containerId, container] of Object.entries(
      presenter.containers,
    )) {
      for (const [widgetId, widget] of Object.entries(container.widgets)) {
        widgetEntities.push({
          ...widget,
          id: widgetId,
          containerId,
        });
      }
    }

    this.presenterStore.update(
      upsertEntities(widgetEntities, { ref: widgetRef }),
    );
  }

  updateProperties(
    widgetId: string,
    properties: PresenterWidget['properties'],
  ): void {
    this.presenterStore.update(
      updateEntities(widgetId, { properties }, { ref: widgetRef }),
    );
  }
}
