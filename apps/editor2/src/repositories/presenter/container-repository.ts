import {
  addEntities,
  deleteEntities,
  selectAllEntities,
  updateEntities,
} from '@ngneat/elf-entities';

import { nanoid } from 'nanoid';
import { Observable } from 'rxjs';

import { write } from '../mutations';

import { PresenterContainerEntity, containerRef } from './container-ref';
import { IContainerRepository } from './container-repository.interface';
import { presenterStore } from './presenter-store';

export class ContainerRepository implements IContainerRepository {
  private readonly presenterStore = presenterStore;

  all$: Observable<PresenterContainerEntity[]> = this.presenterStore.pipe(
    selectAllEntities({ ref: containerRef }),
  );

  select(containerId: string) {
    this.presenterStore.update(
      write((state) => {
        state.selectedContainerId = containerId;
      }),
    );
  }

  createByLabel(containerLabel: string) {
    const newContainer: PresenterContainerEntity = {
      id: nanoid(),
      label: containerLabel,
      type: 'page',
      tree: {},
    };

    this.presenterStore.update(
      addEntities(newContainer, { ref: containerRef }),
    );
  }

  update(
    containerId: string,
    container: Omit<PresenterContainerEntity, 'id'>,
  ): void {
    this.presenterStore.update(
      updateEntities(containerId, container, { ref: containerRef }),
    );
  }

  remove(containerId: string) {
    this.presenterStore.update(
      deleteEntities(containerId, { ref: containerRef }),
    );
  }
}
