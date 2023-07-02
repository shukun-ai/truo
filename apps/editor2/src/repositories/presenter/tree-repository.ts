import { select } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  getEntity,
  selectAllEntities,
  updateEntities,
  upsertEntities,
} from '@ngneat/elf-entities';

import { TypeException } from '@shukun/exception';
import { PresenterTreeNodes } from '@shukun/schema';
import { nanoid } from 'nanoid';
import { Observable, map } from 'rxjs';

import { PresenterContainerEntity, containerRef } from './container-ref';
import {
  addSiblingNode,
  insertNode,
  moveToBeside,
  moveToInside,
  removeNode,
} from './move-node';

import { presenterStore } from './presenter-store';
import { ITreeRepository } from './tree-repository.interface';
import { PresenterTreeCollapse, treeCollapseRef } from './tree-ui-ref';

import { PresenterWidgetEntity, widgetRef } from './widget-ref';

export class TreeRepository implements ITreeRepository {
  private readonly presenterStore = presenterStore;

  selectedTreeNodes$: Observable<PresenterTreeNodes> = this.presenterStore.pipe(
    select((state) => {
      const selectedContainerEntityId = state.selectedContainerEntityId;
      if (!selectedContainerEntityId) {
        return {};
      }
      const container =
        state.presenterContainerEntities[selectedContainerEntityId];
      if (!container) {
        return {};
      }
      return container.tree;
    }),
  );

  selectedTreeCollapses$: Observable<Record<string, PresenterTreeCollapse>> =
    this.presenterStore
      .combine({
        selectedContainerEntityId: this.presenterStore.pipe(
          select((state) => state.selectedContainerEntityId),
        ),
        treeCollapse: this.presenterStore.pipe(
          selectAllEntities({ ref: treeCollapseRef }),
        ),
      })
      .pipe(
        map((state) => {
          const selectedContainerEntityId = state.selectedContainerEntityId;
          if (!selectedContainerEntityId) {
            return {};
          }
          const treeCollapses: Record<string, PresenterTreeCollapse> = {};
          state.treeCollapse.forEach((node) => {
            treeCollapses[node.id] = node;
          });
          return treeCollapses;
        }),
      );

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

  closeTreeCollapse(widgetEntityId: string) {
    const { selectedContainerEntityId } = this.presenterStore.getValue();

    if (!selectedContainerEntityId) {
      throw new TypeException('Did not find selectedContainerEntityId.');
    }

    this.presenterStore.update(
      upsertEntities(
        {
          id: widgetEntityId,
          collapse: true,
        },
        { ref: treeCollapseRef },
      ),
    );
  }

  openTreeCollapse(widgetEntityId: string) {
    const { selectedContainerEntityId } = this.presenterStore.getValue();

    if (!selectedContainerEntityId) {
      throw new TypeException('Did not find selectedContainerEntityId.');
    }

    this.presenterStore.update(
      deleteEntities(widgetEntityId, {
        ref: treeCollapseRef,
      }),
    );
  }

  addWidget(
    type: 'sibling' | 'insert',
    widgetTag: string,
    widgetName: string,
    targetNodeId: string,
  ) {
    const addIntoNode = type === 'sibling' ? addSiblingNode : insertNode;
    const container = this.getSelectedContainer();
    const entityId = nanoid();
    const tree = addIntoNode(container.tree, entityId, targetNodeId);
    const newWidget: PresenterWidgetEntity = {
      id: entityId,
      containerName: container.id,
      widgetName,
      tag: widgetTag,
      properties: {},
      events: {},
    };
    this.presenterStore.update(
      updateEntities(container.id, { tree }, { ref: containerRef }),
      addEntities(newWidget, { ref: widgetRef }),
    );
  }

  private getSelectedContainer(): PresenterContainerEntity {
    const { selectedContainerEntityId } = this.presenterStore.getValue();

    if (!selectedContainerEntityId) {
      throw new TypeException(
        'Did not find selectedContainerEntityId: {{selectedContainerEntityId}}',
        {
          selectedContainerEntityId,
        },
      );
    }
    const container = this.presenterStore.query(
      getEntity(selectedContainerEntityId, { ref: containerRef }),
    );
    if (!container) {
      throw new TypeException(
        'Did not find container: {{selectedContainerEntityId}}',
        {
          selectedContainerEntityId,
        },
      );
    }
    return container;
  }
}
