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
      selectedContainerEntityId: this.presenterStore.pipe(
        select((state) => state.selectedContainerEntityId),
      ),
      repositories: this.presenterStore.pipe(
        selectAllEntities({ ref: repositoryRef }),
      ),
    })
    .pipe(
      map(({ selectedContainerEntityId }) => {
        return this.presenterStore.query(
          getAllEntitiesApply({
            filterEntity: (entity) =>
              entity.containerName === selectedContainerEntityId,
            ref: repositoryRef,
          }),
        );
      }),
      distinctUntilArrayItemChanged(),
    );

  isUniqueRepositoryName(
    containerName: string,
    repositoryName: string,
  ): boolean {
    const existEntity = this.presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (item) =>
          item.containerName === containerName &&
          item.repositoryName === repositoryName,
        ref: repositoryRef,
      }),
    );

    return existEntity.length === 1;
  }

  create(entity: Omit<PresenterRepositoryEntity, 'id'>): void {
    if (
      this.isUniqueRepositoryName(entity.containerName, entity.repositoryName)
    ) {
      throw new TypeException('The repository is duplicated.');
    }

    this.presenterStore.update(
      addEntities(
        {
          ...entity,
          id: createRepositoryEntityId(),
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

  getByRepositoryName(
    containerName: string,
    repositoryName: string,
  ): PresenterRepositoryEntity | null {
    const repositories = this.presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (entity) =>
          entity.containerName === containerName &&
          entity.repositoryName === repositoryName,
        ref: repositoryRef,
      }),
    );

    if (repositories.length === 0) {
      return null;
    }

    return repositories[0];
  }
}
