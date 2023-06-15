import { setProps } from '@ngneat/elf';
import { upsertEntities } from '@ngneat/elf-entities';
import { PresenterSchema } from '@shukun/schema';

import { PresenterContainerEntity, containerRef } from './container-ref';
import { presenterStore } from './presenter-store';
import { PresenterScreenEntity, screenRef } from './screen-ref';
import { ISerializationService } from './serialization-service.interface';
import { PresenterWidgetEntity, widgetRef } from './widget-ref';

export class SerializationService implements ISerializationService {
  private readonly presenterStore = presenterStore;

  parse(presenter: PresenterSchema): void {
    this.presenterStore.update(
      setProps(() => ({ presenterLabel: presenter.label })),
      upsertEntities(this.getScreenEntities(presenter), { ref: screenRef }),
      upsertEntities(this.getContainerEntities(presenter), {
        ref: containerRef,
      }),
      upsertEntities(this.getWidgetEntities(presenter), { ref: widgetRef }),
    );
  }

  private getScreenEntities(
    presenter: PresenterSchema,
  ): PresenterScreenEntity[] {
    const screenEntities: PresenterScreenEntity[] = [];

    for (const [screenId, screen] of Object.entries(presenter.screens)) {
      screenEntities.push({
        id: screenId,
        ...screen,
      });
    }

    return screenEntities;
  }

  private getContainerEntities(
    presenter: PresenterSchema,
  ): PresenterContainerEntity[] {
    const containerEntities: PresenterContainerEntity[] = [];

    for (const [containerId, container] of Object.entries(
      presenter.containers,
    )) {
      containerEntities.push({
        id: containerId,
        ...container,
      });
    }

    return containerEntities;
  }

  private getWidgetEntities(
    presenter: PresenterSchema,
  ): PresenterWidgetEntity[] {
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

    return widgetEntities;
  }
}
