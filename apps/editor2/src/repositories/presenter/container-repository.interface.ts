import { Observable } from 'rxjs';

import { PresenterContainerEntity } from './container-ref';

export interface IContainerRepository {
  all$: Observable<PresenterContainerEntity[]>;

  select(containerId: string): void;
  createByLabel(containerLabel: string): void;
  update(
    containerId: string,
    container: Omit<PresenterContainerEntity, 'id'>,
  ): void;
  remove(containerId: string): void;
}
