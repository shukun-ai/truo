import { Observable } from 'rxjs';

import { PresenterRepositoryEntity } from './repository-ref';

export interface IRepositoryRepository {
  all$: Observable<PresenterRepositoryEntity[]>;
  isUniqueRepositoryId(containerId: string, repositoryId: string): boolean;
  create(entity: Omit<PresenterRepositoryEntity, 'id'>): void;
  update(entityId: string, entity: Omit<PresenterRepositoryEntity, 'id'>): void;
  remove(entityId: string): void;
}
