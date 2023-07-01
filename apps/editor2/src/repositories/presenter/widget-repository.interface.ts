import { PresenterWidget, PresenterWidgets } from '@shukun/schema';
import { Observable } from 'rxjs';

import { PresenterWidgetEntity } from './widget-ref';

export interface IWidgetRepository {
  allWidgets$: Observable<PresenterWidgetEntity[]>;
  selectedWidgets$: Observable<PresenterWidgets>;
  update(entityId: string, entity: Partial<PresenterWidget>): void;
}
