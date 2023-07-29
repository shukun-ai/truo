import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { PresenterWatch } from '@shukun/schema';
import { nanoid } from 'nanoid';

export type PresenterWatchEntity = {
  id: string;
  containerName: string;
  watchName: string;
} & PresenterWatch;

const { watchEntitiesRef, withWatchEntities } = entitiesPropsFactory('watch');

export const withWatch = () => {
  return withWatchEntities<PresenterWatchEntity>();
};

export const watchRef = watchEntitiesRef;

export const createWatchEntityId = (): string => {
  return nanoid();
};

export const getWatch = (watchEntity: PresenterWatchEntity) => {
  const { id, containerName, watchName, ...watch } = watchEntity;
  return watch;
};
