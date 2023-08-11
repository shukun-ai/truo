import { Observable } from 'rxjs';

import { TabEntity } from './tab-ref';

export interface ITabRepository {
  allTabs$: Observable<TabEntity[]>;
  selectedTab$: Observable<TabEntity | null>;
  selectedTabEntityId$: Observable<string | null>;
  selectedWidgetEntityId$: Observable<string | null>;
  selectedRepositoryEntityId$: Observable<string | null>;
  selectedConnectorEntityId$: Observable<string | null>;
  selectedMetadataEntityId$: Observable<string | null>;
  selectedEnvironmentEntityId$: Observable<string | null>;

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
  previewConnectorTab(connectorName: string, connectorEntityId: string): void;
  previewMetadataTab(metadataName: string, metadataEntityId: string): void;
  previewEnvironmentTab(
    environmentName: string,
    environmentEntityId: string,
  ): void;
  fixTab(entityId: string): void;
  activeEditTab(entityId: string): void;
  inactiveEditTab(entityId: string): void;
  chooseTab(entityId: string): void;
  closeTab(entityId: string): void;
}
