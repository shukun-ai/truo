import { Observable } from 'rxjs';

import { TabEntity } from './tab-ref';

export interface ITabRepository {
  allTabs$: Observable<TabEntity[]>;
  selectedTabEntityId$: Observable<string | null>;
  selectedWidgetEntityId$: Observable<string | null>;
  selectedRepositoryEntityId$: Observable<string | null>;
  selectedWatchEntityId$: Observable<string | null>;
  selectedConnectorEntityId$: Observable<string | null>;

  previewWidgetTab(
    containerName: string,
    widgetName: string,
    widgetEntityId: string,
  ): void;
  previewRepositoryTab(
    containerName: string,
    repositoryName: string,
    repositoryEntityId: string,
  ): void;
  previewWatchTab(
    containerName: string,
    watchName: string,
    watchEntityId: string,
  ): void;
  previewConnectorTab(connectorName: string, connectorEntityId: string): void;
  fixTab(entityId: string): void;
  activeEditTab(entityId: string): void;
  inactiveEditTab(entityId: string): void;
  chooseTab(entityId: string): void;
  closeTab(entityId: string): void;
}
