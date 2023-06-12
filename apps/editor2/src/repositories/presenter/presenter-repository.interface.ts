import { PresenterWidgets, WidgetSchema } from '@shukun/schema';
import { Observable } from 'rxjs';

import { IContainerRepository } from './container-repository.interface';
import { ITabRepository } from './tab-repository.interface';
import { IWidgetRepository } from './widget-repository.interface';

export interface IPresenterRepository {
  containerRepository: IContainerRepository;
  widgetRepository: IWidgetRepository;
  tabRepository: ITabRepository;

  widgetDefinitions$: Observable<Record<string, WidgetSchema>>;
  selectedContainerId$: Observable<string | null>;
  selectedWidgetId$: Observable<string | null>;

  fetchLatest(presenterName: string): Promise<void>;
}
