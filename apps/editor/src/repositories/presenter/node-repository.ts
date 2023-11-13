import { setProp } from '@ngneat/elf';
import { deleteEntities, upsertEntities } from '@ngneat/elf-entities';

import {
  getUniqueLabel,
  addSiblingNode,
  insertNode,
  moveToBeside,
  moveToInside,
  removeNode,
} from '@shukun/util-functions';

import { presenterStore } from './presenter-store';
import { treeCollapseRef } from './tree-ui-ref';

import { PresenterWidgetEntity, createWidgetEntityId } from './widget-ref';
import { widgetRepository } from './widget-repository';
export const nodeRepository = {
  moveToBeside: (
    sourceNodeId: string,
    targetNodeId: string,
    position: 'before' | 'after',
  ) => {
    const { nodes } = presenterStore.getValue();
    const newNodes = moveToBeside(nodes, sourceNodeId, targetNodeId, position);
    presenterStore.update(setProp('nodes', newNodes));
  },
  moveToInside: (sourceNodeId: string, targetNodeId: string) => {
    const { nodes } = presenterStore.getValue();
    const newNodes = moveToInside(nodes, sourceNodeId, targetNodeId);
    presenterStore.update(setProp('nodes', newNodes));
  },
  removeTreeNode: (sourceNodeId: string) => {
    const { nodes } = presenterStore.getValue();
    const newNodes = removeNode(nodes, sourceNodeId);
    presenterStore.update(setProp('nodes', newNodes));
    widgetRepository.remove(sourceNodeId);
  },
  closeTreeCollapse: (widgetEntityId: string) => {
    presenterStore.update(
      upsertEntities(
        {
          id: widgetEntityId,
          collapse: true,
        },
        { ref: treeCollapseRef },
      ),
    );
  },
  openTreeCollapse: (widgetEntityId: string) => {
    presenterStore.update(
      deleteEntities(widgetEntityId, {
        ref: treeCollapseRef,
      }),
    );
  },
  addWidget: (
    type: 'sibling' | 'insert',
    widgetTag: string,
    widgetLabel: string,
    targetNodeId: string,
  ) => {
    const addIntoNode = type === 'sibling' ? addSiblingNode : insertNode;
    const { nodes } = presenterStore.getValue();
    const entityId = createWidgetEntityId();
    const newNodes = addIntoNode(nodes, entityId, targetNodeId);
    const newWidget: PresenterWidgetEntity = {
      id: entityId,
      tag: widgetTag,
      label: widgetLabel,
      properties: {},
      events: {},
    };
    presenterStore.update(setProp('nodes', newNodes));
    widgetRepository.create(newWidget);
  },
  copyWidget: (widget: PresenterWidgetEntity, targetNodeId: string): void => {
    const { nodes, widgetEntities } = presenterStore.getValue();
    const entityId = createWidgetEntityId();
    const newNodes = addSiblingNode(nodes, entityId, targetNodeId);
    const newWidget: PresenterWidgetEntity = {
      ...widget,
      id: entityId,
      label: getUniqueLabel(
        widget.label,
        Object.values(widgetEntities).map((widget) => widget.label),
      ),
    };
    presenterStore.update(setProp('nodes', newNodes));
    widgetRepository.create(newWidget);
  },
};
