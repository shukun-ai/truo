import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { PresenterScreen } from '@shukun/schema';

export type PresenterScreenEntity = {
  id: string;
  screenName: string;
} & PresenterScreen;

const { screenEntitiesRef, withScreenEntities } =
  entitiesPropsFactory('screen');

export const withScreen = () => {
  return withScreenEntities<PresenterScreenEntity>();
};

export const screenRef = screenEntitiesRef;

export const createScreenEntityId = (screenName: string): `${string}` => {
  return `${screenName}`;
};

export const getScreen = (entity: PresenterScreenEntity): PresenterScreen => {
  const { id, screenName, ...screen } = entity;
  return { ...screen };
};
