import { select } from '@ngneat/elf';

import { ApiRequester } from '../../apis/requester';

import { ContainerRepository } from './container-repository';
import { DeserializationService } from './deserialization-service';

import { IPresenterRepository } from './presenter-repository.interface';
import { presenterStore } from './presenter-store';
import { SynchronizeService } from './synchronize-service';
import { TabRepository } from './tab-repository';
import { WidgetRepository } from './widget-repository';

export class PresenterRepository implements IPresenterRepository {
  private readonly presenterStore = presenterStore;

  containerRepository = new ContainerRepository();

  widgetRepository = new WidgetRepository();

  tabRepository = new TabRepository();

  deserializationService = new DeserializationService();

  synchronizeService = new SynchronizeService(this.apiRequester);

  widgetDefinitions$ = this.presenterStore.pipe(
    select((state) => state.widgetDefinitions),
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

  constructor(private readonly apiRequester: ApiRequester) {}

  async fetchLatest(presenterName: string) {
    const response = await this.apiRequester.editorRequester.getPresenter();
    const presenter = response.data.value[presenterName];
    if (!presenter) {
      throw new Error('Did not find presenter.');
    }
    this.containerRepository.initialize(presenter);
    this.widgetRepository.upsertByContainer(presenter);
  }
}
