import { PresenterRepository } from '@shukun/schema';

export interface IRepositoryManager {
  register(repositoryId: string, repository: PresenterRepository): void;
  get(repositoryId: string): PresenterRepository;
}
