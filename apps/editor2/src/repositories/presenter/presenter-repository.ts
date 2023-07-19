import { select, setProps } from '@ngneat/elf';

import { Observable } from 'rxjs';

import { ApiRequester } from '../../apis/requester';

import { ContainerRepository } from './container-repository';
import { DeserializationService } from './deserialization-service';

import { IPresenterRepository } from './presenter-repository.interface';
import { ActivityTabs, presenterStore } from './presenter-store';
import { RepositoryRepository } from './repository-repository';
import { ScreenRepository } from './screen-repository';
import { SerializationService } from './serialization-service';
import { SynchronizeService } from './synchronize-service';
import { TreeRepository } from './tree-repository';
import { WatchRepository } from './watch-repository';
import { WidgetRepository } from './widget-repository';

export class PresenterRepository implements IPresenterRepository {
  private readonly presenterStore = presenterStore;

  screenRepository = new ScreenRepository();

  containerRepository = new ContainerRepository();

  widgetRepository = new WidgetRepository();

  treeRepository = new TreeRepository();

  repositoryRepository = new RepositoryRepository();

  watchRepository = new WatchRepository();

  serializationService = new SerializationService();

  deserializationService = new DeserializationService();

  synchronizeService = new SynchronizeService(this.apiRequester);

  widgetDefinitions$ = this.presenterStore.pipe(
    select((state) => state.widgetDefinitions),
  );

  repositoryDefinitions$ = this.presenterStore.pipe(
    select((state) => state.repositoryDefinitions),
  );

  selectedContainerEntityId$ = this.presenterStore.pipe(
    select((state) => state.selectedContainerEntityId),
  );

  selectedActivityTab$: Observable<ActivityTabs | null> =
    this.presenterStore.pipe(select((state) => state.selectedActivityTab));

  constructor(private readonly apiRequester: ApiRequester) {}

  async initialize(presenterName: string) {
    const presenter = await this.synchronizeService.findOne(presenterName);
    if (!presenter) {
      throw new Error('Did not find presenter.');
    }
    this.serializationService.parse(presenter);
  }

  chooseActivityTab(tab: ActivityTabs | null): void {
    this.presenterStore.update(setProps({ selectedActivityTab: tab }));
  }
}
