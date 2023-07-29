import { select } from '@ngneat/elf';
import {
  deleteEntities,
  selectAllEntities,
  updateEntities,
} from '@ngneat/elf-entities';

import { Observable, combineLatest, map } from 'rxjs';

import { write } from '../mutations';

import { presenterStore } from './presenter-store';
import { createScreen } from './screen-create';
import { PresenterScreenEntity, screenRef } from './screen-ref';
import { IScreenRepository } from './screen-repository.interface';

export class ScreenRepository implements IScreenRepository {
  private readonly presenterStore = presenterStore;

  all$: Observable<PresenterScreenEntity[]> = this.presenterStore.pipe(
    selectAllEntities({ ref: screenRef }),
  );

  selectedScreenEntityId$: Observable<string | null> = this.presenterStore.pipe(
    select((state) => state.selectedScreenEntityId),
  );

  selectedScreenEntity$: Observable<PresenterScreenEntity | null> =
    combineLatest([this.selectedScreenEntityId$, this.all$]).pipe(
      map(([selectedScreenEntityId, all]) => {
        if (!selectedScreenEntityId) {
          return null;
        }
        return (
          all.find((screen) => screen.id === selectedScreenEntityId) ?? null
        );
      }),
    );

  async initialize(): Promise<void> {
    //
  }

  select(entityId: string): void {
    this.presenterStore.update(
      write((state) => {
        state.selectedScreenEntityId = entityId;
      }),
    );
  }

  create(entity: PresenterScreenEntity): void {
    createScreen(entity);
  }

  update(entity: PresenterScreenEntity): void {
    this.presenterStore.update(
      updateEntities(entity.id, entity, { ref: screenRef }),
    );
  }

  remove(entityId: string): void {
    this.presenterStore.update(deleteEntities(entityId, { ref: screenRef }));
  }
}
