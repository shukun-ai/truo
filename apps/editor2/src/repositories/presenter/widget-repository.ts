import { upsertEntities } from '@ngneat/elf-entities';

import { PresenterSchema } from '@shukun/schema';

import { presenterStore } from './presenter-store';
import {
  PresenterWidgetEntity,
  getWidgetEntityId,
  widgetRef,
} from './widget-ref';
import { IWidgetRepository } from './widget-repository.interface';

export class WidgetRepository implements IWidgetRepository {
  private readonly presenterStore = presenterStore;

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
}
