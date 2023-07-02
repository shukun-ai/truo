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
  PresenterWatchEntity,
  createWatchEntityId,
  watchRef,
} from './watch-ref';
import { IWatchRepository } from './watch-repository.interface';

export class WatchRepository implements IWatchRepository {
  private readonly presenterStore = presenterStore;

  all$: Observable<PresenterWatchEntity[]> = this.presenterStore
    .combine({
      selectedContainerEntityId: this.presenterStore.pipe(
        select((state) => state.selectedContainerEntityId),
      ),
      watches: this.presenterStore.pipe(selectAllEntities({ ref: watchRef })),
    })
    .pipe(
      map(({ selectedContainerEntityId }) => {
        return this.presenterStore.query(
          getAllEntitiesApply({
            filterEntity: (entity) =>
              entity.containerName === selectedContainerEntityId,
            ref: watchRef,
          }),
        );
      }),
      distinctUntilArrayItemChanged(),
    );

  isUniqueWatchName(containerName: string, watchName: string): boolean {
    const existEntity = this.presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (item) =>
          item.containerName === containerName && item.watchName === watchName,
        ref: watchRef,
      }),
    );

    return existEntity.length === 1;
  }

  create(entity: Omit<PresenterWatchEntity, 'id'>): void {
    if (this.isUniqueWatchName(entity.containerName, entity.watchName)) {
      throw new TypeException('The watch is duplicated.');
    }

    this.presenterStore.update(
      addEntities(
        {
          ...entity,
          id: createWatchEntityId(),
        },
        { ref: watchRef },
      ),
    );
  }

  update(entityId: string, entity: Omit<PresenterWatchEntity, 'id'>): void {
    this.presenterStore.update(
      updateEntities(entityId, entity, { ref: watchRef }),
    );
  }

  remove(entityId: string): void {
    this.presenterStore.update(deleteEntities(entityId, { ref: watchRef }));
  }

  getByWatchName(
    containerName: string,
    watchName: string,
  ): PresenterWatchEntity | null {
    const watches = this.presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (entity) =>
          entity.containerName === containerName &&
          entity.watchName === watchName,
        ref: watchRef,
      }),
    );

    if (watches.length === 0) {
      return null;
    }

    return watches[0];
  }
}
