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
      selectedContainerEntityId: this.presenterStore.pipe(
        select((state) => state.selectedContainerEntityId),
      ),
      widgets: this.presenterStore.pipe(selectAllEntities({ ref: widgetRef })),
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
        const selectedWidgets: PresenterWidgets = {};
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

  upsertByContainer(presenter: PresenterSchema): void {
    const widgetEntities: PresenterWidgetEntity[] = [];

    for (const [containerName, container] of Object.entries(
      presenter.containers,
    )) {
      for (const [widgetName, widget] of Object.entries(container.widgets)) {
        widgetEntities.push({
          ...widget,
          id: widgetName,
          containerName,
        });
      }
    }

    this.presenterStore.update(
      upsertEntities(widgetEntities, { ref: widgetRef }),
    );
  }

  updateProperties(
    widgetName: string,
    properties: PresenterWidget['properties'],
  ): void {
    this.presenterStore.update(
      updateEntities(widgetName, { properties }, { ref: widgetRef }),
    );
  }
}
