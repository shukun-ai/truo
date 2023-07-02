import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { PresenterContainer } from '@shukun/schema';

export type PresenterContainerEntity = {
  id: string;
  containerName: string;
} & Omit<PresenterContainer, 'repositories' | 'widgets' | 'watches'>;

const { containerEntitiesRef, withContainerEntities } =
  entitiesPropsFactory('container');

export const withContainer = () => {
  return withContainerEntities<PresenterContainerEntity>();
};

export const containerRef = containerEntitiesRef;

export const createContainerEntityId = (containerName: string): `${string}` => {
  return `${containerName}`;
};

export const getContainer = (
  entity: PresenterContainerEntity,
): PresenterContainer => {
  const { id, containerName, ...container } = entity;
  return { ...container, repositories: {}, widgets: {}, watches: {} };
};
