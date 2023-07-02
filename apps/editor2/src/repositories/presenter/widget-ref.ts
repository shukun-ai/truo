import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { PresenterWidget } from '@shukun/schema';

export type PresenterWidgetEntity = {
  id: string;
  containerName: string;
  widgetName: string;
} & PresenterWidget;

const { widgetEntitiesRef, withWidgetEntities } =
  entitiesPropsFactory('widget');

export const withWidget = () => {
  return withWidgetEntities<PresenterWidgetEntity>();
};

export const widgetRef = widgetEntitiesRef;
