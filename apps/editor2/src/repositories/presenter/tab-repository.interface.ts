import { Observable } from 'rxjs';

import { PresenterTabEntity } from './tab-ref';

export interface ITabRepository {
  selectedTabId$: Observable<string | null>;
  allTabs$: Observable<PresenterTabEntity[]>;
  previewWidgetTab(widgetId: string): void;
  fixTab(tabId: string): void;
  chooseTab(tabId: string): void;
  closeTab(tabId: string): void;
}
