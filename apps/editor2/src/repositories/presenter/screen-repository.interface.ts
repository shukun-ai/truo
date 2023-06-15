import { Observable } from 'rxjs';

import { PresenterScreenEntity } from './screen-ref';

export interface IScreenRepository {
  all$: Observable<PresenterScreenEntity[]>;
  selectedScreenId$: Observable<string | null>;
  isUniqueId(screenId: string): boolean;
  select(screenId: string): void;
  create(screenId: string, screen: Omit<PresenterScreenEntity, 'id'>): void;
  remove(screenId: string): void;
}
