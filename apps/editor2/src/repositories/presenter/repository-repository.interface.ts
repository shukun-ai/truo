import { Observable } from 'rxjs';

import { PresenterRepositoryEntity } from './repository-ref';

export interface IRepositoryRepository {
  all$: Observable<PresenterRepositoryEntity[]>;
  isUniqueRepositoryName(
    containerName: string,
    repositoryName: string,
  ): boolean;
  create(entity: Omit<PresenterRepositoryEntity, 'id'>): void;
  update(entityId: string, entity: Omit<PresenterRepositoryEntity, 'id'>): void;
  remove(entityId: string): void;
}
