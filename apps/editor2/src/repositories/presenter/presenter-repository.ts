import { select } from '@ngneat/elf';

import { ApiRequester } from '../../apis/requester';

import { ContainerRepository } from './container-repository';
import { DeserializationService } from './deserialization-service';

import { IPresenterRepository } from './presenter-repository.interface';
import { presenterStore } from './presenter-store';
import { RepositoryRepository } from './repository-repository';
import { ScreenRepository } from './screen-repository';
import { SerializationService } from './serialization-service';
import { SynchronizeService } from './synchronize-service';
import { TabRepository } from './tab-repository';
import { TreeRepository } from './tree-repository';
import { WidgetRepository } from './widget-repository';

export class PresenterRepository implements IPresenterRepository {
  private readonly presenterStore = presenterStore;

  screenRepository = new ScreenRepository();

  containerRepository = new ContainerRepository();

  widgetRepository = new WidgetRepository();

  treeRepository = new TreeRepository();

  tabRepository = new TabRepository();

  repositoryRepository = new RepositoryRepository();

  serializationService = new SerializationService();

  deserializationService = new DeserializationService();

  synchronizeService = new SynchronizeService(this.apiRequester);

  widgetDefinitions$ = this.presenterStore.pipe(
    select((state) => state.widgetDefinitions),
  );

  repositoryDefinitions$ = this.presenterStore.pipe(
    select((state) => state.repositoryDefinitions),
  );

  selectedContainerId$ = this.presenterStore.pipe(
    select((state) => state.selectedContainerId),
  );

  selectedWidgetId$ = this.presenterStore.pipe(
    select((state) => {
      const tabId = state.selectedTabId;
      if (!tabId) {
        return null;
      }
      const tabEntity = state.presenterTabEntities[tabId];
      if (tabEntity.tabType !== 'widget') {
        return null;
      }
      return tabEntity.widgetId;
    }),
  );

  selectedRepositoryId$ = this.presenterStore.pipe(
    select((state) => {
      const tabId = state.selectedTabId;
      if (!tabId) {
        return null;
      }
      const tabEntity = state.presenterTabEntities[tabId];
      if (tabEntity.tabType !== 'repository') {
        return null;
      }
      return tabEntity.repositoryName;
    }),
  );

  constructor(private readonly apiRequester: ApiRequester) {}

  async initialize(presenterName: string) {
    const presenter = await this.synchronizeService.findOne(presenterName);
    if (!presenter) {
      throw new Error('Did not find presenter.');
    }
    this.serializationService.parse(presenter);
  }
}
