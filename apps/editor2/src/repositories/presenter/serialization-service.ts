import { setProps } from '@ngneat/elf';
import { upsertEntities } from '@ngneat/elf-entities';
import { PresenterSchema } from '@shukun/schema';

import { PresenterContainerEntity, containerRef } from './container-ref';
import { presenterStore } from './presenter-store';
import {
  PresenterRepositoryEntity,
  createRepositoryEntityId,
  repositoryRef,
} from './repository-ref';
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
      upsertEntities(this.getRepositoryEntities(presenter), {
        ref: repositoryRef,
      }),
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

    for (const [containerName, container] of Object.entries(
      presenter.containers,
    )) {
      containerEntities.push({
        id: containerName,
        containerName,
        ...container,
      });
    }

    return containerEntities;
  }

  private getWidgetEntities(
    presenter: PresenterSchema,
  ): PresenterWidgetEntity[] {
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

    return widgetEntities;
  }

  private getRepositoryEntities(
    presenter: PresenterSchema,
  ): PresenterRepositoryEntity[] {
    const repositoryEntities: PresenterRepositoryEntity[] = [];

    for (const [containerName, container] of Object.entries(
      presenter.containers,
    )) {
      for (const [repositoryName, repository] of Object.entries(
        container.repositories,
      )) {
        repositoryEntities.push({
          ...repository,
          id: createRepositoryEntityId(containerName, repositoryName),
          containerName,
          repositoryName,
        });
      }
    }

    return repositoryEntities;
  }
}
