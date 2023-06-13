import { select } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  getEntitiesIds,
  getEntity,
  selectAllEntities,
  updateEntities,
  upsertEntities,
} from '@ngneat/elf-entities';
import { TypeException } from '@shukun/exception';
import { PresenterSchema, PresenterTreeNodes } from '@shukun/schema';

import { Observable, map } from 'rxjs';

import { write } from '../mutations';

import { PresenterContainerEntity, containerRef } from './container-ref';
import { IContainerRepository } from './container-repository.interface';
import {
  addSiblingNode,
  insertNode,
  moveToBeside,
  moveToInside,
  removeNode,
} from './move-node';
import { presenterStore } from './presenter-store';
import { createRandomWidgetId } from './random-widget-id';
import { PresenterTreeCollapse, treeCollapseRef } from './tree-ui-ref';
import { PresenterWidgetEntity, widgetRef } from './widget-ref';

export class ContainerRepository implements IContainerRepository {
  addWidgetIntoChildNode(
    newWidgetTag: string,
    newWidgetTitle: string,
    targetNodeId: string,
  ): void {
    throw new Error('Method not implemented.');
  }
  private readonly presenterStore = presenterStore;

  allContainers$: Observable<PresenterContainerEntity[]> =
    this.presenterStore.pipe(selectAllEntities({ ref: containerRef }));

  selectedTreeNodes$: Observable<PresenterTreeNodes> = this.presenterStore.pipe(
    select((state) => {
      const selectedContainerId = state.selectedContainerId;
      if (!selectedContainerId) {
        return {};
      }
      const container = state.presenterContainerEntities[selectedContainerId];
      if (!container) {
        return {};
      }
      return container.tree;
    }),
  );

  selectedTreeCollapses$: Observable<Record<string, PresenterTreeCollapse>> =
    this.presenterStore
      .combine({
        selectedContainerId: this.presenterStore.pipe(
          select((state) => state.selectedContainerId),
        ),
        treeCollapse: this.presenterStore.pipe(
          selectAllEntities({ ref: treeCollapseRef }),
        ),
      })
      .pipe(
        map((state) => {
          const selectedContainerId = state.selectedContainerId;
          if (!selectedContainerId) {
            return {};
          }
          const treeCollapses: Record<string, PresenterTreeCollapse> = {};
          state.treeCollapse.forEach((node) => {
            treeCollapses[node.id] = node;
          });
          return treeCollapses;
        }),
      );

  initialize(presenter: PresenterSchema): void {
    const containerEntities: PresenterContainerEntity[] = [];

    for (const [containerId, container] of Object.entries(
      presenter.containers,
    )) {
      containerEntities.push({
        id: containerId,
        ...container,
      });
    }

    this.presenterStore.update(
      upsertEntities(containerEntities, { ref: containerRef }),
    );
  }

  isUniqueContainerName(containerName: string) {
    const { presenterContainerEntities } = this.presenterStore.getValue();
    const container = presenterContainerEntities[containerName];
    return !container;
  }

  selectContainer(containerId: string) {
    this.presenterStore.update(
      write((state) => {
        state.selectedContainerId = containerId;
      }),
    );
  }

  createContainer(containerId: string) {
    const newContainer: PresenterContainerEntity = {
      id: containerId,
      type: 'page',
      tree: {},
    };

    this.presenterStore.update(
      addEntities(newContainer, { ref: containerRef }),
    );
  }

  removeContainer(containerId: string) {
    this.presenterStore.update(
      deleteEntities(containerId, { ref: containerRef }),
    );
  }

  moveToBeside(
    sourceNodeId: string,
    targetNodeId: string,
    position: 'before' | 'after',
  ) {
    const container = this.getSelectedContainer();
    const tree = moveToBeside(
      container.tree,
      sourceNodeId,
      targetNodeId,
      position,
    );

    this.presenterStore.update(
      updateEntities(container.id, { tree }, { ref: containerRef }),
    );
  }

  moveToInside(sourceNodeId: string, targetNodeId: string) {
    const container = this.getSelectedContainer();
    const tree = moveToInside(container.tree, sourceNodeId, targetNodeId);

    this.presenterStore.update(
      updateEntities(container.id, { tree }, { ref: containerRef }),
    );
  }

  removeTreeNode(sourceNodeId: string) {
    const container = this.getSelectedContainer();
    const tree = removeNode(container.tree, sourceNodeId);

    this.presenterStore.update(
      updateEntities(container.id, { tree }, { ref: containerRef }),
      deleteEntities(sourceNodeId, {
        ref: widgetRef,
      }),
    );
  }

  closeTreeCollapse(sourceNodeId: string) {
    const { selectedContainerId } = this.presenterStore.getValue();

    if (!selectedContainerId) {
      throw new TypeException('Did not find selectedContainerId.');
    }

    this.presenterStore.update(
      upsertEntities(
        {
          id: sourceNodeId,
          collapse: true,
        },
        { ref: treeCollapseRef },
      ),
    );
  }

  openTreeCollapse(sourceNodeId: string) {
    const { selectedContainerId } = this.presenterStore.getValue();

    if (!selectedContainerId) {
      throw new TypeException('Did not find selectedContainerId.');
    }

    this.presenterStore.update(
      deleteEntities(sourceNodeId, {
        ref: treeCollapseRef,
      }),
    );
  }

  addWidget(
    type: 'sibling' | 'insert',
    newWidgetTag: string,
    newWidgetTitle: string,
    targetNodeId: string,
  ) {
    const addIntoNode = type === 'sibling' ? addSiblingNode : insertNode;
    const container = this.getSelectedContainer();
    const existWidgetIds = this.presenterStore.query(
      getEntitiesIds({ ref: widgetRef }),
    );
    const newNodeId = createRandomWidgetId(existWidgetIds);
    const tree = addIntoNode(container.tree, newNodeId, targetNodeId);
    const newWidget: PresenterWidgetEntity = {
      id: newNodeId,
      containerId: container.id,
      tag: newWidgetTag,
      title: newWidgetTitle,
      properties: {},
      events: {},
    };
    this.presenterStore.update(
      updateEntities(container.id, { tree }, { ref: containerRef }),
      addEntities(newWidget, { ref: widgetRef }),
    );
  }

  private getSelectedContainer(): PresenterContainerEntity {
    const { selectedContainerId } = this.presenterStore.getValue();

    if (!selectedContainerId) {
      throw new TypeException(
        'Did not find selectedContainerId: {{selectedContainerId}}',
        {
          selectedContainerId,
        },
      );
    }
    const container = this.presenterStore.query(
      getEntity(selectedContainerId, { ref: containerRef }),
    );
    if (!container) {
      throw new TypeException(
        'Did not find container: {{selectedContainerId}}',
        {
          selectedContainerId,
        },
      );
    }
    return container;
  }
}
