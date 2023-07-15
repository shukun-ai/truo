import { select, setProps } from '@ngneat/elf';
import {
  deleteEntities,
  getEntity,
  selectAllEntities,
  updateEntities,
} from '@ngneat/elf-entities';

import { TypeException } from '@shukun/exception';

import { Observable } from 'rxjs';

import { ConnectorTab } from './internal/connector-tab';
import { MetadataTab } from './internal/metadata-tab';
import { RepositoryTab } from './internal/repository-tab';
import { WatchTab } from './internal/watch-tab';
import { WidgetTab } from './internal/widget-tab';
import { TabEntity, tabRef } from './tab-ref';

import { ITabRepository } from './tab-repository.interface';
import { tabStore } from './tab-store';

export class TabRepository implements ITabRepository {
  private readonly tabStore = tabStore;
  private readonly widgetTab = new WidgetTab();
  private readonly repositoryTab = new RepositoryTab();
  private readonly watchTab = new WatchTab();
  private readonly connectorTab = new ConnectorTab();
  private readonly metadataTab = new MetadataTab();

  allTabs$: Observable<TabEntity[]> = this.tabStore.pipe(
    selectAllEntities({ ref: tabRef }),
  );

  selectedTabEntityId$: Observable<string | null> = this.tabStore.pipe(
    select((state) => state.selectedTabEntityId),
  );

  selectedWidgetEntityId$ = this.widgetTab.selectedWidgetEntityId$;

  selectedRepositoryEntityId$ = this.repositoryTab.selectedRepositoryEntityId$;

  selectedWatchEntityId$ = this.watchTab.selectedWatchEntityId$;

  selectedConnectorEntityId$ = this.connectorTab.selectedConnectorEntityId$;

  selectedMetadataEntityId$ = this.metadataTab.selectedMetadataEntityId$;

  previewWidgetTab(
    containerName: string,
    widgetName: string,
    widgetEntityId: string,
  ): void {
    this.widgetTab.preview(containerName, widgetName, widgetEntityId);
  }

  previewRepositoryTab(
    containerName: string,
    repositoryName: string,
    repositoryEntityId: string,
  ): void {
    this.repositoryTab.preview(
      containerName,
      repositoryName,
      repositoryEntityId,
    );
  }

  previewWatchTab(
    containerName: string,
    watchName: string,
    watchEntityId: string,
  ): void {
    this.watchTab.preview(containerName, watchName, watchEntityId);
  }

  previewConnectorTab(connectorName: string, connectorEntityId: string): void {
    this.connectorTab.preview(connectorName, connectorEntityId);
  }

  previewMetadataTab(metadataName: string, metadataEntityId: string): void {
    this.metadataTab.preview(metadataName, metadataEntityId);
  }

  fixTab(tabId: string): void {
    this.tabStore.update(
      updateEntities(
        tabId,
        {
          isPreview: false,
        },
        { ref: tabRef },
      ),
      setProps({
        selectedTabEntityId: tabId,
      }),
    );
  }

  activeEditTab(tabId: string): void {
    this.tabStore.update(
      updateEntities(
        tabId,
        {
          isEdit: true,
        },
        { ref: tabRef },
      ),
    );
  }

  inactiveEditTab(tabId: string): void {
    this.tabStore.update(
      updateEntities(
        tabId,
        {
          isEdit: false,
        },
        { ref: tabRef },
      ),
    );
  }

  chooseTab(tabId: string): void {
    const tab = this.tabStore.query(getEntity(tabId, { ref: tabRef }));
    if (!tab) {
      throw new TypeException('Did not find tab: {{tabId}}', { tabId });
    }
    const props =
      'containerName' in tab
        ? {
            selectedTabEntityId: tab.id,
            selectedContainerEntityId: tab.containerName,
          }
        : {
            selectedTabEntityId: tab.id,
          };

    this.tabStore.update(setProps(props));
  }

  closeTab(tabId: string): void {
    this.tabStore.update(
      deleteEntities(tabId, { ref: tabRef }),
      setProps((state) => {
        const entities = Object.values(state.tabEntities);

        return {
          selectedTabEntityId: entities.length > 0 ? entities[0].id : null,
        };
      }),
    );
  }
}
