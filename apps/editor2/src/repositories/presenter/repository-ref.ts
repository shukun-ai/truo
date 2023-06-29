import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { PresenterRepository } from '@shukun/schema';

export type PresenterRepositoryEntity = {
  id: string;
  containerId: string;
  repositoryId: string;
} & PresenterRepository;

const { presenterRepositoryEntitiesRef, withPresenterRepositoryEntities } =
  entitiesPropsFactory('presenterRepository');

export const withRepository = () => {
  return withPresenterRepositoryEntities<PresenterRepositoryEntity>();
};

export const repositoryRef = presenterRepositoryEntitiesRef;

export const createRepositoryEntityId = (
  containerId: string,
  repositoryId: string,
): `${string}:${string}` => {
  return `${containerId}:${repositoryId}`;
};

export const getRepository = (repositoryEntity: PresenterRepositoryEntity) => {
  // TODO use omit instead
  const { id, containerId, repositoryId, ...repository } = repositoryEntity;
  return repository;
};
