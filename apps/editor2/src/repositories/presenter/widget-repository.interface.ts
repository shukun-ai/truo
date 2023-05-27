import { PresenterSchema, PresenterWidget } from '@shukun/schema';
import { Observable } from 'rxjs';

import { PresenterWidgetEntity } from './widget-ref';

export interface IWidgetRepository {
  allWidgets$: Observable<PresenterWidgetEntity[]>;
  upsertByContainer(presenter: PresenterSchema): void;
  updateProperties(
    entityId: string,
    properties: PresenterWidget['properties'],
  ): void;
}
