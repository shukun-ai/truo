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
import { IWidgetRepository } from './widget-repository.interface';

export interface IPresenterRepository {
  screenRepository: IScreenRepository;
  containerRepository: IContainerRepository;
  widgetRepository: IWidgetRepository;
  treeRepository: ITreeRepository;
  tabRepository: ITabRepository;
  repositoryRepository: IRepositoryRepository;
  serializationService: ISerializationService;
  deserializationService: IDeserializationService;
  synchronizeService: ISynchronizeService;

  widgetDefinitions$: Observable<Record<string, WidgetSchema>>;
  repositoryDefinitions$: Observable<Record<string, RepositorySchema>>;
  selectedContainerId$: Observable<string | null>;
  selectedWidgetId$: Observable<string | null>;
  selectedRepositoryId$: Observable<string | null>;

  initialize(presenterName: string): Promise<void>;
}
