import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { PresenterScreen } from '@shukun/schema';

export type PresenterScreenEntity = {
  id: string;
} & PresenterScreen;

const { screenEntitiesRef, withScreenEntities } =
  entitiesPropsFactory('screen');

export const withScreen = () => {
  return withScreenEntities<PresenterScreenEntity>();
};

export const screenRef = screenEntitiesRef;
