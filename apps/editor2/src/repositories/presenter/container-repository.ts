import {
  addEntities,
  deleteEntities,
  getAllEntitiesApply,
  selectAllEntities,
  updateEntities,
} from '@ngneat/elf-entities';

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

  isUniqueName(containerName: string): boolean {
    const entities = this.presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (entity) => entity.containerName === containerName,
        ref: containerRef,
      }),
    );
    return entities.length === 0;
  }

  select(containerName: string) {
    this.presenterStore.update(
      write((state) => {
        state.selectedContainerEntityId = containerName;
      }),
    );
  }

  create(containerName: string) {
    const entity: PresenterContainerEntity = {
      id: containerName,
      containerName,
      type: 'page',
      tree: {},
    };

    this.presenterStore.update(addEntities(entity, { ref: containerRef }));
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
