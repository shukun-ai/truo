import { Observable } from 'rxjs';

import { PresenterScreenEntity } from './screen-ref';

export interface IScreenRepository {
  all$: Observable<PresenterScreenEntity[]>;
  selectedScreenEntityId$: Observable<string | null>;
  selectedScreenEntity$: Observable<PresenterScreenEntity | null>;

  initialize(): Promise<void>;
  select(entityId: string): void;
  create(entity: PresenterScreenEntity): void;
  update(entity: PresenterScreenEntity): void;
  remove(entityId: string): void;
}
