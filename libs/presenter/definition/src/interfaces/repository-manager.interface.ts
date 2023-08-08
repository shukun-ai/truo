import { IRepository } from './repository.interface';

export interface IRepositoryManager {
  register(identifier: repositoryIdentifier, repository: IRepository): void;
  get(identifier: repositoryIdentifier): IRepository;
}

export type repositoryIdentifier = {
  scope: 'app' | 'container';
  containerId: string;
  repositoryId: string;
};
