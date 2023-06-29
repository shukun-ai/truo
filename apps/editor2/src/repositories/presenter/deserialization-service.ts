import { getAllEntities, getAllEntitiesApply } from '@ngneat/elf-entities';
import { PresenterContainer, PresenterSchema } from '@shukun/schema';

import { containerRef } from './container-ref';
import { IDeserializationService } from './deserialization-service.interface';
import { presenterStore } from './presenter-store';
import { getRepository, repositoryRef } from './repository-ref';
import { screenRef } from './screen-ref';
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
      containers[container.id] = {
        type: container.type,
        label: container.label,
        repositories: this.buildRepositories(container.id),
        widgets: this.buildWidgets(container.id),
        tree: container.tree,
        watches: {},
      };
    });
    return containers;
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

  private buildWidgets(containerId: string): PresenterContainer['widgets'] {
    const widgetEntities = this.presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (widget) => widget.containerId === containerId,
        ref: widgetRef,
      }),
    );
    const widgets: PresenterContainer['widgets'] = {};
    widgetEntities.forEach((widget) => {
      widgets[widget.id] = {
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
    containerId: string,
  ): PresenterContainer['repositories'] {
    const repositoryEntities = this.presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (repository) => repository.containerId === containerId,
        ref: repositoryRef,
      }),
    );
    const repositories: PresenterContainer['repositories'] = {};
    repositoryEntities.forEach((entity) => {
      repositories[entity.repositoryId] = getRepository(entity);
    });
    return repositories;
  }
}
