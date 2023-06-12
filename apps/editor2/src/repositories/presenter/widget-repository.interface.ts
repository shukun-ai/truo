import {
  PresenterSchema,
  PresenterWidget,
  PresenterWidgets,
} from '@shukun/schema';
import { Observable } from 'rxjs';

import { PresenterWidgetEntity } from './widget-ref';

export interface IWidgetRepository {
  allWidgets$: Observable<PresenterWidgetEntity[]>;
  selectedWidgets$: Observable<PresenterWidgets>;
  upsertByContainer(presenter: PresenterSchema): void;
  updateProperties(
    entityId: string,
    properties: PresenterWidget['properties'],
  ): void;
}
