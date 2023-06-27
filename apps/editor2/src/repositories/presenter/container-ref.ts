import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { PresenterContainer } from '@shukun/schema';

export type PresenterContainerEntity = {
  id: string;
} & Omit<PresenterContainer, 'repositories' | 'widgets' | 'root' | 'watches'>;

const { presenterContainerEntitiesRef, withPresenterContainerEntities } =
  entitiesPropsFactory('presenterContainer');

export const withContainer = () => {
  return withPresenterContainerEntities<PresenterContainerEntity>();
};

export const containerRef = presenterContainerEntitiesRef;
