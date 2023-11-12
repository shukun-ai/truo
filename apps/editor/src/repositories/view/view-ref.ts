import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { ViewSchema } from '@shukun/schema';
import { nanoid } from 'nanoid';

export type ViewEntity = {
  id: string;
  viewName: string;
} & ViewSchema;

const { viewEntitiesRef, withViewEntities } = entitiesPropsFactory('view');

export const withView = () => {
  return withViewEntities<ViewEntity>();
};

export const viewRef = viewEntitiesRef;

export const createViewEntityId = (viewName: string): `${string}` => {
  return nanoid();
};

export const getView = (entity: ViewEntity): ViewSchema => {
  const { id, viewName, ...view } = entity;
  return { ...view };
};
