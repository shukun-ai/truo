import { Observable } from 'rxjs';

import { PresenterContainerEntity } from './container-ref';

export interface IContainerRepository {
  allContainers$: Observable<PresenterContainerEntity[]>;

  isUniqueContainerName(containerName: string): boolean;
  selectContainer(containerId: string): void;
  createContainer(containerName: string): void;
  removeContainer(containerName: string): void;
}
