import { getAllEntities, getAllEntitiesApply } from '@ngneat/elf-entities';
import {
  PresenterContainer,
  PresenterSchema,
  PresenterTreeNodes,
} from '@shukun/schema';

import { containerRef } from './container-ref';
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
      containers: this.buildContainers(),
      screens: this.buildScreens(),
    };
    return presenter;
  }

  private buildContainers(): PresenterSchema['containers'] {
    const containerEntities = this.presenterStore.query(
      getAllEntities({ ref: containerRef }),
    );
    const containers: PresenterSchema['containers'] = {};
    containerEntities.forEach((container) => {
      containers[container.containerName] = {
        type: container.type,
        repositories: this.buildRepositories(container.containerName),
        widgets: this.buildWidgets(container.containerName),
        tree: this.buildTreeNodes(container.containerName, container.tree),
        watches: this.buildWatches(container.containerName),
      };
    });
    return containers;
  }

  private buildTreeNodes(
    containerName: string,
    treeNodes: PresenterTreeNodes,
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

  private buildScreens(): PresenterSchema['screens'] {
    const screenEntities = this.presenterStore.query(
      getAllEntities({ ref: screenRef }),
    );
    const screens: PresenterSchema['screens'] = {};
    screenEntities.forEach((screen) => {
      screens[screen.id] = {
        layout: screen.layout,
        slots: screen.slots,
      };
    });
    return screens;
  }

  private buildWidgets(containerName: string): PresenterContainer['widgets'] {
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
