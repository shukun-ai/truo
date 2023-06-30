import { Observable } from 'rxjs';

import { PresenterContainerEntity } from './container-ref';

export interface IContainerRepository {
  all$: Observable<PresenterContainerEntity[]>;

  select(containerName: string): void;
  createByLabel(containerLabel: string): void;
  update(
    containerName: string,
    container: Omit<PresenterContainerEntity, 'id'>,
  ): void;
  remove(containerName: string): void;
}
