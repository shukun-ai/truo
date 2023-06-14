import { WidgetSchema } from '@shukun/schema';
import { Observable } from 'rxjs';

import { IContainerRepository } from './container-repository.interface';
import { IDeserializationService } from './deserialization-service.interface';
import { ISerializationService } from './serialization-service.interface';
import { ISynchronizeService } from './synchronize-service.interface';
import { ITabRepository } from './tab-repository.interface';
import { IWidgetRepository } from './widget-repository.interface';

export interface IPresenterRepository {
  containerRepository: IContainerRepository;
  widgetRepository: IWidgetRepository;
  tabRepository: ITabRepository;
  serializationService: ISerializationService;
  deserializationService: IDeserializationService;
  synchronizeService: ISynchronizeService;

  widgetDefinitions$: Observable<Record<string, WidgetSchema>>;
  selectedContainerId$: Observable<string | null>;
  selectedWidgetId$: Observable<string | null>;

  initialize(presenterName: string): Promise<void>;
}
