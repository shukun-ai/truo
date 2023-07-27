import { select } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  getAllEntitiesApply,
  selectAllEntities,
  updateEntities,
} from '@ngneat/elf-entities';

import { Observable, combineLatest, map } from 'rxjs';

import { write } from '../mutations';

import {
  PresenterContainerEntity,
  containerRef,
  createContainerEntityId,
} from './container-ref';
import { IContainerRepository } from './container-repository.interface';
import { presenterStore } from './presenter-store';

export class ContainerRepository implements IContainerRepository {
  private readonly presenterStore = presenterStore;

  all$: Observable<PresenterContainerEntity[]> = this.presenterStore.pipe(
    selectAllEntities({ ref: containerRef }),
  );

  records$: Observable<Record<string, PresenterContainerEntity>> =
    this.presenterStore.pipe(select((state) => state.containerEntities));

  selectedEntityId$: Observable<string | null> = this.presenterStore.pipe(
    select((state) => state.selectedContainerEntityId),
  );

  selectedEntity$: Observable<PresenterContainerEntity | null> = combineLatest([
    this.selectedEntityId$,
    this.all$,
  ]).pipe(
    map(([selectedEntityId, all]) => {
      if (!selectedEntityId) {
        return null;
      }
      return all.find((entity) => entity.id === selectedEntityId) ?? null;
    }),
  );

  isUniqueLabel(label: string): boolean {
    const entities = this.presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (entity) => entity.label === label,
        ref: containerRef,
      }),
    );
    return entities.length === 0;
  }

  select(entityId: string) {
    this.presenterStore.update(
      write((state) => {
        state.selectedContainerEntityId = entityId;
      }),
    );
  }

  create(label: string) {
    const id = createContainerEntityId();
    const entity: PresenterContainerEntity = {
      id: id,
      containerName: id,
      type: 'page',
      label,
      tree: {
        root: [],
      },
    };

    this.presenterStore.update(addEntities(entity, { ref: containerRef }));
  }

  update(entityId: string, entity: Omit<PresenterContainerEntity, 'id'>): void {
    this.presenterStore.update(
      updateEntities(entityId, entity, { ref: containerRef }),
    );
  }

  remove(entityId: string) {
    this.presenterStore.update(deleteEntities(entityId, { ref: containerRef }));
  }
}
