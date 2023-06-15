import {
  addEntities,
  deleteEntities,
  selectAllEntities,
} from '@ngneat/elf-entities';

import { Observable } from 'rxjs';

import { write } from '../mutations';

import { PresenterContainerEntity, containerRef } from './container-ref';
import { IContainerRepository } from './container-repository.interface';
import { presenterStore } from './presenter-store';

export class ContainerRepository implements IContainerRepository {
  private readonly presenterStore = presenterStore;

  allContainers$: Observable<PresenterContainerEntity[]> =
    this.presenterStore.pipe(selectAllEntities({ ref: containerRef }));

  isUniqueContainerName(containerName: string) {
    const { presenterContainerEntities } = this.presenterStore.getValue();
    const container = presenterContainerEntities[containerName];
    return !container;
  }

  selectContainer(containerId: string) {
    this.presenterStore.update(
      write((state) => {
        state.selectedContainerId = containerId;
      }),
    );
  }

  createContainer(containerId: string) {
    const newContainer: PresenterContainerEntity = {
      id: containerId,
      type: 'page',
      tree: {},
    };

    this.presenterStore.update(
      addEntities(newContainer, { ref: containerRef }),
    );
  }

  removeContainer(containerId: string) {
    this.presenterStore.update(
      deleteEntities(containerId, { ref: containerRef }),
    );
  }
}
