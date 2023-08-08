import { TypeException } from '@shukun/exception';
import { IRepository } from '@shukun/presenter/definition';
import {
  IRepositoryManager,
  repositoryIdentifier,
} from '@shukun/presenter/definition';

export class RepositoryManager implements IRepositoryManager {
  private repositories: Map<string, IRepository> = new Map();

  register(identifier: repositoryIdentifier, repository: IRepository): void {
    this.repositories.set(this.getRepositoryKey(identifier), repository);
  }

  get(identifier: repositoryIdentifier): IRepository {
    const key = this.getRepositoryKey(identifier);
    const repository = this.repositories.get(key);
    if (!repository) {
      throw new TypeException('Did not find repository: {{key}}', { key });
    }
    return repository;
  }

  private getRepositoryKey(identifier: repositoryIdentifier) {
    const { scope, containerId, repositoryId } = identifier;
    switch (scope) {
      case 'app':
        // TODO the _app is wrong, should remove it.
        return `_app:${repositoryId}`;
      case 'container':
        return `container:${containerId}:${repositoryId}`;
    }
  }
}
