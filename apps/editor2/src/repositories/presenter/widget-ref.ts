import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { PresenterWidget } from '@shukun/schema';

export type PresenterWidgetEntity = {
  id: string;
  containerId: string;
} & PresenterWidget;

const { presenterWidgetEntitiesRef, withPresenterWidgetEntities } =
  entitiesPropsFactory('presenterWidget');

export const withWidget = () => {
  return withPresenterWidgetEntities<PresenterWidgetEntity>();
};

export const widgetRef = presenterWidgetEntitiesRef;
