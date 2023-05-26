import { Observable } from 'rxjs';

import { PresenterTabEntity } from './tab-ref';

export interface ITabRepository {
  allTabs$: Observable<PresenterTabEntity[]>;
  previewWidgetTab(widgetId: string): void;
  openWidgetTab(widgetId: string): void;
  chooseTab(tabId: string): void;
  closeTab(tabId: string): void;
}
