import {
  selectAllEntities,
  updateEntities,
  upsertEntities,
} from '@ngneat/elf-entities';

import { PresenterSchema, PresenterWidget } from '@shukun/schema';

import { Observable } from 'rxjs';

import { presenterStore } from './presenter-store';
import {
  PresenterWidgetEntity,
  getWidgetEntityId,
  widgetRef,
} from './widget-ref';
import { IWidgetRepository } from './widget-repository.interface';

export class WidgetRepository implements IWidgetRepository {
  private readonly presenterStore = presenterStore;

  allWidgets$: Observable<PresenterWidgetEntity[]> = this.presenterStore.pipe(
    selectAllEntities({ ref: widgetRef }),
  );

  upsertByContainer(presenter: PresenterSchema): void {
    const widgetEntities: PresenterWidgetEntity[] = [];

    for (const [containerId, container] of Object.entries(
      presenter.containers,
    )) {
      for (const [widgetId, widget] of Object.entries(container.widgets)) {
        widgetEntities.push({
          ...widget,
          id: getWidgetEntityId(containerId, widgetId),
          containerId,
          widgetId,
        });
      }
    }

    this.presenterStore.update(
      upsertEntities(widgetEntities, { ref: widgetRef }),
    );
  }

  updateProperties(
    entityId: string,
    properties: PresenterWidget['properties'],
  ): void {
    this.presenterStore.update(
      updateEntities(entityId, { properties }, { ref: widgetRef }),
    );
  }
}
