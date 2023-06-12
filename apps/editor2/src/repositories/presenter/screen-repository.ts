import { selectAllEntities } from '@ngneat/elf-entities';

import { Observable } from 'rxjs';

import { presenterStore } from './presenter-store';
import { PresenterScreenEntity, screenRef } from './screen-ref';
import { IScreenRepository } from './screen-repository.interface';

export class ScreenRepository implements IScreenRepository {
  private readonly presenterStore = presenterStore;

  allScreens$: Observable<PresenterScreenEntity[]> = this.presenterStore.pipe(
    selectAllEntities({ ref: screenRef }),
  );
}
