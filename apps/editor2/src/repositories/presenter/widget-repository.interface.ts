import { Observable } from 'rxjs';

import { PresenterWidgetEntity } from './widget-ref';

export interface IWidgetRepository {
  allWidgets$: Observable<PresenterWidgetEntity[]>;
  selectedWidgetEntities$: Observable<Record<string, PresenterWidgetEntity>>;
  create(entity: PresenterWidgetEntity): void;
  update(entityId: string, entity: Partial<PresenterWidgetEntity>): void;
  remove(entityId: string): void;
  rename(entityId: string, containerName: string, label: string): void;
  getLabels(containerName: string, label: string): string[];
  validateLabel(containerName: string, label: string): void;
}
