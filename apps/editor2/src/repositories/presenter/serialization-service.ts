import { setProps } from '@ngneat/elf';
import { upsertEntities } from '@ngneat/elf-entities';
import { PresenterSchema } from '@shukun/schema';

import { nanoid } from 'nanoid';

import { PresenterContainerEntity, containerRef } from './container-ref';
import { presenterStore } from './presenter-store';
import {
  PresenterRepositoryEntity,
  createRepositoryEntityId,
  repositoryRef,
} from './repository-ref';
import {
  PresenterScreenEntity,
  createScreenEntityId,
  screenRef,
} from './screen-ref';
import { ISerializationService } from './serialization-service.interface';
import { toWidgetEntityIdTree, toWidgetEntityIds } from './tree-convertor';
import {
  PresenterWatchEntity,
  createWatchEntityId,
  watchRef,
} from './watch-ref';
import { PresenterWidgetEntity, widgetRef } from './widget-ref';

export class SerializationService implements ISerializationService {
  private readonly presenterStore = presenterStore;

  parse(presenter: PresenterSchema): void {
    const { initialized } = this.presenterStore.getValue();

    if (initialized) {
      return;
    }

    const screenEntities = this.getScreenEntities(presenter);
    const containerEntities = this.getContainerEntities(presenter);
    const widgetEntities = this.getWidgetEntities(presenter);
    const repositoryEntities = this.getRepositoryEntities(presenter);
    const watchEntities = this.getWatchEntities(presenter);
    const parsedContainerEntities = this.toContainerWidgetEntityTree(
      containerEntities,
      widgetEntities,
    );

    this.presenterStore.update(
      setProps(() => ({ initialized: true, presenterLabel: presenter.label })),
      upsertEntities(screenEntities, { ref: screenRef }),
      upsertEntities(parsedContainerEntities, { ref: containerRef }),
      upsertEntities(widgetEntities, { ref: widgetRef }),
      upsertEntities(repositoryEntities, { ref: repositoryRef }),
      upsertEntities(watchEntities, { ref: watchRef }),
    );
  }

  private getScreenEntities(
    presenter: PresenterSchema,
  ): PresenterScreenEntity[] {
    const screenEntities: PresenterScreenEntity[] = [];

    for (const [screenName, screen] of Object.entries(presenter.screens)) {
      screenEntities.push({
        id: createScreenEntityId(screenName),
        screenName,
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
          id: nanoid(),
          containerName,
          widgetName,
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
          id: createRepositoryEntityId(),
          containerName,
          repositoryName,
        });
      }
    }

    return repositoryEntities;
  }

  private getWatchEntities(presenter: PresenterSchema): PresenterWatchEntity[] {
    const watchEntities: PresenterWatchEntity[] = [];

    for (const [containerName, container] of Object.entries(
      presenter.containers,
    )) {
      for (const [watchName, watch] of Object.entries(container.watches)) {
        watchEntities.push({
          ...watch,
          id: createWatchEntityId(),
          containerName,
          watchName,
        });
      }
    }

    return watchEntities;
  }

  private toContainerWidgetEntityTree(
    containerEntities: PresenterContainerEntity[],
    widgetEntities: PresenterWidgetEntity[],
  ): PresenterContainerEntity[] {
    const widgetEntityIdMap = toWidgetEntityIds(widgetEntities);
    return containerEntities.map((container) => {
      const treeNodes = toWidgetEntityIdTree(
        container.containerName,
        container.tree,
        widgetEntityIdMap,
      );
      return {
        ...container,
        tree: treeNodes,
      };
    });
  }
}
