import { select } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  getEntitiesIds,
  selectAllEntities,
  updateEntities,
} from '@ngneat/elf-entities';

import { Observable } from 'rxjs';

import { write } from '../mutations';

import { presenterStore } from './presenter-store';
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

  isUniqueId(screenId: string): boolean {
    const ids = this.presenterStore.query(getEntitiesIds({ ref: screenRef }));
    const isUniqueId = !ids.includes(screenId);
    return isUniqueId;
  }

  select(screenId: string): void {
    this.presenterStore.update(
      write((state) => {
        state.selectedScreenEntityId = screenId;
      }),
    );
  }

  create(screenId: string, screen: Omit<PresenterScreenEntity, 'id'>): void {
    this.presenterStore.update(
      addEntities(
        {
          ...screen,
          id: screenId,
        },
        { ref: screenRef },
      ),
    );
  }

  update(screenId: string, screen: Omit<PresenterScreenEntity, 'id'>): void {
    this.presenterStore.update(
      updateEntities(screenId, screen, { ref: screenRef }),
    );
  }

  remove(screenId: string): void {
    this.presenterStore.update(deleteEntities(screenId, { ref: screenRef }));
  }
}
