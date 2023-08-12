import { select } from '@ngneat/elf';

import { Observable } from 'rxjs';

import { ApiRequester } from '../../apis/requester';

import { IPresenterRepository } from './presenter-repository.interface';
import { ActivityTab, presenterStore } from './presenter-store';
import { serialization } from './serialization-service';
import { SynchronizeService } from './synchronize-service';
import { ISynchronizeService } from './synchronize-service.interface';

export class PresenterRepository implements IPresenterRepository {
  private readonly presenterStore = presenterStore;

  synchronizeService: ISynchronizeService;

  widgetDefinitions$ = this.presenterStore.pipe(
    select((state) => state.widgetDefinitions),
  );

  repositoryDefinitions$ = this.presenterStore.pipe(
    select((state) => state.repositoryDefinitions),
  );

  selectedActivityTab$: Observable<ActivityTab | null> =
    this.presenterStore.pipe(select((state) => state.selectedActivityTab));

  constructor(private readonly apiRequester: ApiRequester) {
    this.synchronizeService = new SynchronizeService(this.apiRequester);
  }

  async initialize(presenterName: string) {
    const presenter = await this.synchronizeService.findOne(presenterName);
    if (!presenter) {
      throw new Error('Did not find presenter.');
    }
    serialization.parse(presenter);
  }
}
