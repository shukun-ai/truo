import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { PresenterScreen } from '@shukun/schema';

export type PresenterScreenEntity = {
  id: string;
} & PresenterScreen;

const { presenterScreenEntitiesRef, withPresenterScreenEntities } =
  entitiesPropsFactory('presenterScreen');

export const withScreen = () => {
  return withPresenterScreenEntities<PresenterScreenEntity>();
};

export const screenRef = presenterScreenEntitiesRef;
