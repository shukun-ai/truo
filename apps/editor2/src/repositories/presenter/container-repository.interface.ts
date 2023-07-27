import { Observable } from 'rxjs';

import { PresenterContainerEntity } from './container-ref';

export interface IContainerRepository {
  all$: Observable<PresenterContainerEntity[]>;
  selectedEntityId$: Observable<string | null>;
  selectedEntity$: Observable<PresenterContainerEntity | null>;
  isUniqueLabel(label: string): boolean;
  select(entityId: string): void;
  create(label: string): void;
  update(entityId: string, entity: Omit<PresenterContainerEntity, 'id'>): void;
  remove(entityId: string): void;
}
