import { distinctUntilArrayItemChanged, select } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  getAllEntitiesApply,
  selectAllEntities,
  updateEntities,
} from '@ngneat/elf-entities';

import { TypeException } from '@shukun/exception';
import { Observable, map } from 'rxjs';

import { presenterStore } from './presenter-store';
import {
  PresenterRepositoryEntity,
  createRepositoryEntityId,
  repositoryRef,
} from './repository-ref';
import { IRepositoryRepository } from './repository-repository.interface';

export class RepositoryRepository implements IRepositoryRepository {
  private readonly presenterStore = presenterStore;

  all$: Observable<PresenterRepositoryEntity[]> = this.presenterStore
    .combine({
      selectedContainerId: this.presenterStore.pipe(
        select((state) => state.selectedContainerId),
      ),
      repositories: this.presenterStore.pipe(
        selectAllEntities({ ref: repositoryRef }),
      ),
    })
    .pipe(
      map(({ selectedContainerId }) => {
        return this.presenterStore.query(
          getAllEntitiesApply({
            filterEntity: (entity) =>
              entity.containerId === selectedContainerId,
            ref: repositoryRef,
          }),
        );
      }),
      distinctUntilArrayItemChanged(),
    );

  isUniqueRepositoryId(containerId: string, repositoryId: string): boolean {
    const existEntity = this.presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (item) =>
          item.containerId === containerId &&
          item.repositoryId === repositoryId,
        ref: repositoryRef,
      }),
    );

    return existEntity.length === 1;
  }

  create(entity: Omit<PresenterRepositoryEntity, 'id'>): void {
    if (this.isUniqueRepositoryId(entity.containerId, entity.repositoryId)) {
      throw new TypeException('The repository is duplicated.');
    }

    this.presenterStore.update(
      addEntities(
        {
          ...entity,
          id: createRepositoryEntityId(entity.containerId, entity.repositoryId),
        },
        { ref: repositoryRef },
      ),
    );
  }

  update(
    entityId: string,
    entity: Omit<PresenterRepositoryEntity, 'id'>,
  ): void {
    this.presenterStore.update(
      updateEntities(entityId, entity, { ref: repositoryRef }),
    );
  }

  remove(entityId: string): void {
    this.presenterStore.update(
      deleteEntities(entityId, { ref: repositoryRef }),
    );
  }
}
