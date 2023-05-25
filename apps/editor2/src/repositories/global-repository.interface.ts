import { PresenterSchema } from '@shukun/schema';

import { Observable } from 'rxjs';

export interface IGlobalRepository {
  presenters$: Observable<
    {
      name: string;
      definition: PresenterSchema;
    }[]
  >;

  fetchPresenters(): Promise<void>;
}
