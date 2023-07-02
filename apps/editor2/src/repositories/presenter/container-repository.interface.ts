import { Observable } from 'rxjs';

import { PresenterContainerEntity } from './container-ref';

export interface IContainerRepository {
  all$: Observable<PresenterContainerEntity[]>;

  isUniqueName(containerName: string): boolean;
  select(entityId: string): void;
  create(containerName: string): void;
  update(entityId: string, entity: Omit<PresenterContainerEntity, 'id'>): void;
  remove(entityId: string): void;
}
