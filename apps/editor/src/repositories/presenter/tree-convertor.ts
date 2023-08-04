import { PresenterTreeNodes } from '@shukun/schema';

import { ROOT_NODE_ID } from './presenter-store';
import { PresenterWidgetEntity } from './widget-ref';

export type widgetNamesMap = {
  [widgetEntityId: string]: string /* @remark the string is widgetName */;
};

export const toWidgetNames = (
  widgetEntities: PresenterWidgetEntity[],
): widgetNamesMap => {
  const map: widgetNamesMap = {};
  widgetEntities.forEach((entity) => {
    map[entity.id] = entity.widgetName;
  });
  return map;
};

export const toWidgetNameTree = (
  treeNodes: PresenterTreeNodes,
  widgetNames: widgetNamesMap,
) => {
  const newTreeNodes: PresenterTreeNodes = {};

  Object.entries(treeNodes).forEach(
    ([parentWidgetEntityId, childWidgetEntityIds]) => {
      const newParentWidgetEntityId = widgetNames[parentWidgetEntityId];
      const newChildWidgetNames = childWidgetEntityIds
        .map((childWidgetEntityId) => widgetNames[childWidgetEntityId])
        .filter((name) => !!name);

      if (parentWidgetEntityId === ROOT_NODE_ID) {
        newTreeNodes[ROOT_NODE_ID] = newChildWidgetNames;
      } else {
        newTreeNodes[newParentWidgetEntityId] = newChildWidgetNames;
      }
    },
  );

  return newTreeNodes;
};

export type widgetEntityIdsMap = {
  [
    containerAndWidgetName: `${string}:${string}`
  ]: string /* @remark the string is widgetEntityId */;
};

export const toWidgetEntityIds = (
  widgetEntities: PresenterWidgetEntity[],
): widgetEntityIdsMap => {
  const map: widgetEntityIdsMap = {};
  widgetEntities.forEach((entity) => {
    map[`${entity.containerName}:${entity.widgetName}`] = entity.id;
  });
  return map;
};
