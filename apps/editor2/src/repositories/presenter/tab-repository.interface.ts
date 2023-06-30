import { Observable } from 'rxjs';

import { PresenterTabEntity } from './tab-ref';

export interface ITabRepository {
  allTabs$: Observable<PresenterTabEntity[]>;
  selectedTabId$: Observable<string | null>;
  previewWidgetTab(containerName: string, widgetId: string): void;
  previewRepositoryTab(containerName: string, repositoryName: string): void;
  fixTab(entityId: string): void;
  activeEditTab(entityId: string): void;
  inactiveEditTab(entityId: string): void;
  chooseTab(entityId: string): void;
  closeTab(entityId: string): void;
}
