import { RepositorySchema, WidgetSchema } from '@shukun/schema';
import { Observable } from 'rxjs';

import { IContainerRepository } from './container-repository.interface';
import { IDeserializationService } from './deserialization-service.interface';
import { IRepositoryRepository } from './repository-repository.interface';
import { IScreenRepository } from './screen-repository.interface';
import { ISerializationService } from './serialization-service.interface';
import { ISynchronizeService } from './synchronize-service.interface';
import { ITabRepository } from './tab-repository.interface';
import { ITreeRepository } from './tree-repository.interface';
import { IWatchRepository } from './watch-repository.interface';
import { IWidgetRepository } from './widget-repository.interface';

export interface IPresenterRepository {
  screenRepository: IScreenRepository;
  containerRepository: IContainerRepository;
  widgetRepository: IWidgetRepository;
  treeRepository: ITreeRepository;
  tabRepository: ITabRepository;
  repositoryRepository: IRepositoryRepository;
  watchRepository: IWatchRepository;
  serializationService: ISerializationService;
  deserializationService: IDeserializationService;
  synchronizeService: ISynchronizeService;

  widgetDefinitions$: Observable<Record<string, WidgetSchema>>;
  repositoryDefinitions$: Observable<Record<string, RepositorySchema>>;
  selectedContainerEntityId$: Observable<string | null>;
  selectedWidgetEntityId$: Observable<string | null>;
  selectedRepositoryEntityId$: Observable<string | null>;
  selectedWatchEntityId$: Observable<string | null>;

  initialize(presenterName: string): Promise<void>;
}
