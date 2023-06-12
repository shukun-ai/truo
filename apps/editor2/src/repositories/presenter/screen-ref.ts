import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { PresenterScreen } from '@shukun/schema';
import { omit } from 'lodash';

export type PresenterScreenEntity = {
  id: string; // screenId
  screenId: string;
} & PresenterScreen;

const { presenterScreenEntitiesRef, withPresenterScreenEntities } =
  entitiesPropsFactory('presenterScreen');

export const withScreen = () => {
  return withPresenterScreenEntities<PresenterScreenEntity>();
};

export const screenRef = presenterScreenEntitiesRef;

export const getScreenEntityId = (screenId: string) => {
  return `${screenId}`;
};

export const getScreen = (
  screenEntity: PresenterScreenEntity,
): PresenterScreen => {
  return omit(screenEntity, ['id', 'screenId']);
};
