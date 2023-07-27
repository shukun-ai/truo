import { PresenterWidget } from '@shukun/schema';
import { Observable } from 'rxjs';

import { PresenterWidgetEntity } from './widget-ref';

export interface IWidgetRepository {
  allWidgets$: Observable<PresenterWidgetEntity[]>;
  selectedWidgetEntities$: Observable<Record<string, PresenterWidgetEntity>>;
  update(entityId: string, entity: Partial<PresenterWidget>): void;
  rename(entityId: string, label: string): void;
}
