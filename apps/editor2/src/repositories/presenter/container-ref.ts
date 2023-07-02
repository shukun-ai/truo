import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { PresenterContainer } from '@shukun/schema';

export type PresenterContainerEntity = {
  id: string;
  containerName: string;
} & Omit<PresenterContainer, 'repositories' | 'widgets' | 'watches'>;

const { presenterContainerEntitiesRef, withPresenterContainerEntities } =
  entitiesPropsFactory('presenterContainer');

export const withContainer = () => {
  return withPresenterContainerEntities<PresenterContainerEntity>();
};

export const containerRef = presenterContainerEntitiesRef;

export const createContainerEntityId = (containerName: string): `${string}` => {
  return `${containerName}`;
};

export const getContainer = (
  entity: PresenterContainerEntity,
): PresenterContainer => {
  const { id, containerName, ...container } = entity;
  return { ...container, repositories: {}, widgets: {}, watches: {} };
};
