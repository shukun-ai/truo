import { getAllEntities, getAllEntitiesApply } from '@ngneat/elf-entities';
import { PresenterSchema } from '@shukun/schema';

import { IDeserializationService } from './deserialization-service.interface';
import { presenterStore } from './presenter-store';
import { getRepository, repositoryRef } from './repository-ref';
import { screenRef } from './screen-ref';
import { toWidgetNameTree, toWidgetNames } from './tree-convertor';
import { getWatch, watchRef } from './watch-ref';
import { widgetRef } from './widget-ref';

export class DeserializationService implements IDeserializationService {
  private readonly presenterStore = presenterStore;

  build(): PresenterSchema {
    const presenterTitle = this.presenterStore.query(
      (state) => state.presenterLabel,
    );
    const presenter: PresenterSchema = {
      label: presenterTitle,
      // containers: this.buildContainers(),
      // screens: this.buildScreens(),
      widgets: this.buildWidgets(),
      nodes: this.buildNodes(),
      repositories: this.buildRepositories(),
    };
    return presenter;
  }

  private buildWidgets(): PresenterSchema['widgets'] {
    const widgetEntities = this.presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (widget) => widget.containerName === containerName,
        ref: widgetRef,
      }),
    );
    const widgets: PresenterContainer['widgets'] = {};
    widgetEntities.forEach((widget) => {
      widgets[widget.widgetName] = {
        tag: widget.tag,
        label: widget.label,
        parentSlot: widget.parentSlot,
        properties: widget.properties,
        events: widget.events,
      };
    });
    return widgets;
  }

  private buildNodes(
    containerName: string,
    treeNodes: PresenterNodes,
  ): PresenterTreeNodes {
    const widgetEntities = this.presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (widget) => widget.containerName === containerName,
        ref: widgetRef,
      }),
    );
    const widgetNames = toWidgetNames(widgetEntities);
    return toWidgetNameTree(treeNodes, widgetNames);
  }

  private buildRepositories(
    containerName: string,
  ): PresenterContainer['repositories'] {
    const repositoryEntities = this.presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (repository) =>
          repository.containerName === containerName,
        ref: repositoryRef,
      }),
    );
    const repositories: PresenterContainer['repositories'] = {};
    repositoryEntities.forEach((entity) => {
      repositories[entity.repositoryName] = getRepository(entity);
    });
    return repositories;
  }

  private buildWatches(containerName: string): PresenterContainer['watches'] {
    const watchEntities = this.presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (watch) => watch.containerName === containerName,
        ref: watchRef,
      }),
    );
    const watches: PresenterContainer['watches'] = {};
    watchEntities.forEach((entity) => {
      watches[entity.watchName] = getWatch(entity);
    });
    return watches;
  }
}
