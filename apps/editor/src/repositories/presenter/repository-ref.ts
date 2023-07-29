import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { PresenterRepository } from '@shukun/schema';
import { nanoid } from 'nanoid';

export type PresenterRepositoryEntity = {
  id: string;
  containerName: string;
  repositoryName: string;
} & PresenterRepository;

const { repositoryEntitiesRef, withRepositoryEntities } =
  entitiesPropsFactory('repository');

export const withRepository = () => {
  return withRepositoryEntities<PresenterRepositoryEntity>();
};

export const repositoryRef = repositoryEntitiesRef;

export const createRepositoryEntityId = (): string => {
  return nanoid();
};

export const getRepository = (repositoryEntity: PresenterRepositoryEntity) => {
  const { id, containerName, repositoryName, ...repository } = repositoryEntity;
  return repository;
};
