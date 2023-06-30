import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { PresenterRepository } from '@shukun/schema';

export type PresenterRepositoryEntity = {
  id: string;
  containerName: string;
  repositoryName: string;
} & PresenterRepository;

const { presenterRepositoryEntitiesRef, withPresenterRepositoryEntities } =
  entitiesPropsFactory('presenterRepository');

export const withRepository = () => {
  return withPresenterRepositoryEntities<PresenterRepositoryEntity>();
};

export const repositoryRef = presenterRepositoryEntitiesRef;

export const createRepositoryEntityId = (
  containerName: string,
  repositoryName: string,
): `${string}:${string}` => {
  return `${containerName}:${repositoryName}`;
};

export const getRepository = (repositoryEntity: PresenterRepositoryEntity) => {
  // TODO use omit instead
  const { id, containerName, repositoryName, ...repository } = repositoryEntity;
  return repository;
};
