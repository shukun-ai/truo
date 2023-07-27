import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { PresenterWidget } from '@shukun/schema';
import { nanoid } from 'nanoid';

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

export const createWidgetEntityId = (): `${string}` => {
  return `W-${nanoid()}`;
};

export const getWidget = (entity: PresenterWidgetEntity): PresenterWidget => {
  const { id, containerName, widgetName, ...other } = entity;
  return other;
};
