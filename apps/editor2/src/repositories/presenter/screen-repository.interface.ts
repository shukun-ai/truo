import { Observable } from 'rxjs';

import { PresenterScreenEntity } from './screen-ref';

export interface IScreenRepository {
  allScreens$: Observable<PresenterScreenEntity[]>;
}
