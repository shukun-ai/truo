import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { PresenterRepository } from '@shukun/schema';

export type PresenterRepositoryEntity = {
  id: string;
} & PresenterRepository;

const { repositoryEntitiesRef, withRepositoryEntities } =
  entitiesPropsFactory('repository');

export const withRepository = () => {
  return withRepositoryEntities<PresenterRepositoryEntity>();
};

export const repositoryRef = repositoryEntitiesRef;

export const createRepositoryEntityId = (repositoryId: string): string => {
  return repositoryId;
};

export const getRepository = (repositoryEntity: PresenterRepositoryEntity) => {
  const { id, ...repository } = repositoryEntity;
  return repository;
};
