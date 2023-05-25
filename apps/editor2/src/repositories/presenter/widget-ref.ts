import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { PresenterWidget } from '@shukun/schema';
import { omit } from 'lodash';

export type PresenterWidgetEntity = {
  id: string; // containerId:widgetId
  containerId: string;
  widgetId: string;
} & PresenterWidget;

const { presenterWidgetEntitiesRef, withPresenterWidgetEntities } =
  entitiesPropsFactory('presenterWidget');

export const withWidget = () => {
  return withPresenterWidgetEntities<PresenterWidgetEntity>();
};

export const widgetRef = presenterWidgetEntitiesRef;

export const getWidgetEntityId = (containerId: string, widgetId: string) => {
  return `${containerId}:${widgetId}`;
};

export const getWidget = (
  widgetEntity: PresenterWidgetEntity,
): PresenterWidget => {
  return omit(widgetEntity, ['id', 'containerId', 'widgetId']);
};
