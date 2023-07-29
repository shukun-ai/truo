import { select, setProps } from '@ngneat/elf';

import { getAllEntitiesApply } from '@ngneat/elf-entities';
import { Observable } from 'rxjs';

import { ApiRequester } from '../../apis/requester';

import { containerRef } from './container-ref';
import { ContainerRepository } from './container-repository';
import { IContainerRepository } from './container-repository.interface';
import { DeserializationService } from './deserialization-service';

import { IDeserializationService } from './deserialization-service.interface';
import { IPresenterRepository } from './presenter-repository.interface';
import { ActivityTabs, presenterStore } from './presenter-store';
import { RepositoryRepository } from './repository-repository';
import { IRepositoryRepository } from './repository-repository.interface';
import { screenRef } from './screen-ref';
import { ScreenRepository } from './screen-repository';
import { IScreenRepository } from './screen-repository.interface';
import { SerializationService } from './serialization-service';
import { ISerializationService } from './serialization-service.interface';
import { SynchronizeService } from './synchronize-service';
import { ISynchronizeService } from './synchronize-service.interface';
import { TreeRepository } from './tree-repository';
import { ITreeRepository } from './tree-repository.interface';
import { WatchRepository } from './watch-repository';
import { IWatchRepository } from './watch-repository.interface';
import { WidgetRepository } from './widget-repository';
import { IWidgetRepository } from './widget-repository.interface';

export class PresenterRepository implements IPresenterRepository {
  private readonly presenterStore = presenterStore;

  screenRepository: IScreenRepository;
  containerRepository: IContainerRepository;
  widgetRepository: IWidgetRepository;
  treeRepository: ITreeRepository;
  repositoryRepository: IRepositoryRepository;
  watchRepository: IWatchRepository;
  serializationService: ISerializationService;
  deserializationService: IDeserializationService;
  synchronizeService: ISynchronizeService;

  widgetDefinitions$ = this.presenterStore.pipe(
    select((state) => state.widgetDefinitions),
  );

  repositoryDefinitions$ = this.presenterStore.pipe(
    select((state) => state.repositoryDefinitions),
  );

  /**
   * @deprecated
   * TODO remove it, using this.containerRepository.selectedEntityId$
   */
  selectedContainerEntityId$ = this.presenterStore.pipe(
    select((state) => state.selectedContainerEntityId),
  );

  selectedActivityTab$: Observable<ActivityTabs | null> =
    this.presenterStore.pipe(select((state) => state.selectedActivityTab));

  constructor(private readonly apiRequester: ApiRequester) {
    this.screenRepository = new ScreenRepository();
    this.containerRepository = new ContainerRepository();
    this.widgetRepository = new WidgetRepository();
    this.treeRepository = new TreeRepository(this.widgetRepository);
    this.repositoryRepository = new RepositoryRepository();
    this.watchRepository = new WatchRepository();
    this.serializationService = new SerializationService();
    this.deserializationService = new DeserializationService();
    this.synchronizeService = new SynchronizeService(this.apiRequester);
  }

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

  chooseContainer(screenName: string, containerName: string): void {
    const screens = this.presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (entity) => entity.screenName === screenName,
        ref: screenRef,
      }),
    );
    const containers = this.presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (entity) => entity.containerName === containerName,
        ref: containerRef,
      }),
    );
    if (screens.length !== 1 || containers.length !== 1) {
      throw new Error(
        'The screens or containers is less than 1 or greater than 1',
      );
    }
    this.screenRepository.select(screens[0].id);
    this.containerRepository.select(containers[0].id);
  }
}
