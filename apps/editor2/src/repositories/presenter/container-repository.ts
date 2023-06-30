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

  select(containerName: string) {
    this.presenterStore.update(
      write((state) => {
        state.selectedContainerEntityId = containerName;
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
    containerName: string,
    container: Omit<PresenterContainerEntity, 'id'>,
  ): void {
    this.presenterStore.update(
      updateEntities(containerName, container, { ref: containerRef }),
    );
  }

  remove(containerName: string) {
    this.presenterStore.update(
      deleteEntities(containerName, { ref: containerRef }),
    );
  }
}
