import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { PresenterRepository } from '@shukun/schema';
import { nanoid } from 'nanoid';

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

export const createRepositoryEntityId = (): string => {
  return nanoid();
};

export const getRepository = (repositoryEntity: PresenterRepositoryEntity) => {
  const { id, containerName, repositoryName, ...repository } = repositoryEntity;
  return repository;
};
