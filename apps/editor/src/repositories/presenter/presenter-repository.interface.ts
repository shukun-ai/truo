import { WidgetSchema } from '@shukun/schema';
import { Observable } from 'rxjs';

import { ActivityTab } from './presenter-store';
import { ISynchronizeService } from './synchronize-service.interface';

export interface IPresenterRepository {
  synchronizeService: ISynchronizeService;

  widgetDefinitions$: Observable<Record<string, WidgetSchema>>;
  selectedActivityTab$: Observable<ActivityTab | null>;

  initialize(presenterName: string): Promise<void>;
}
