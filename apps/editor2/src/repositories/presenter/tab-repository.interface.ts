import { Observable } from 'rxjs';

import { PresenterTabEntity } from './tab-ref';

export interface ITabRepository {
  allTabs$: Observable<PresenterTabEntity[]>;
  selectedTabId$: Observable<string | null>;
  previewWidgetTab(containerId: string, widgetId: string): void;
  fixTab(tabId: string): void;
  chooseTab(tabId: string): void;
  closeTab(tabId: string): void;
}
