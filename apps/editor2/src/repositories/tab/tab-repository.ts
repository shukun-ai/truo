import { select, setProps } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  getAllEntitiesApply,
  getEntity,
  selectAllEntities,
  updateEntities,
} from '@ngneat/elf-entities';

import { TypeException } from '@shukun/exception';
import { nanoid } from 'nanoid';

import { Observable } from 'rxjs';

import { TabEntity, tabRef } from './tab-ref';

import { ITabRepository } from './tab-repository.interface';
import { tabStore } from './tab-store';

export class TabRepository implements ITabRepository {
  private readonly tabStore = tabStore;

  allTabs$: Observable<TabEntity[]> = this.tabStore.pipe(
    selectAllEntities({ ref: tabRef }),
  );

  selectedTabEntityId$: Observable<string | null> = this.tabStore.pipe(
    select((state) => state.selectedTabEntityId),
  );

  selectedWidgetEntityId$ = this.tabStore.pipe(
    select((state) => {
      const tabId = state.selectedTabEntityId;
      if (!tabId) {
        return null;
      }
      const tabEntity = state.tabEntities[tabId];
      if (tabEntity.tabType !== 'widget') {
        return null;
      }
      return tabEntity.widgetEntityId;
    }),
  );

  selectedRepositoryEntityId$ = this.tabStore.pipe(
    select((state) => {
      const tabId = state.selectedTabEntityId;
      if (!tabId) {
        return null;
      }
      const tabEntity = state.tabEntities[tabId];
      if (tabEntity.tabType !== 'repository') {
        return null;
      }
      return tabEntity.repositoryEntityId;
    }),
  );

  selectedWatchEntityId$ = this.tabStore.pipe(
    select((state) => {
      const tabId = state.selectedTabEntityId;
      if (!tabId) {
        return null;
      }
      const tabEntity = state.tabEntities[tabId];
      if (tabEntity.tabType !== 'watch') {
        return null;
      }
      return tabEntity.watchEntityId;
    }),
  );

  previewWidgetTab(
    containerName: string,
    widgetName: string,
    widgetEntityId: string,
  ): void {
    const existPreviewWidgetTab = this.getExistPreviewTab(
      'widget',
      containerName,
      widgetName,
    );

    if (existPreviewWidgetTab.length === 1) {
      this.selectPreviewTab(existPreviewWidgetTab[0].id);
    } else if (existPreviewWidgetTab.length === 0) {
      const entity = this.createPreviewTabEntity(
        'widget',
        containerName,
        widgetName,
        widgetEntityId,
      );
      this.createPreviewTab(entity);
    }
  }

  previewRepositoryTab(
    containerName: string,
    repositoryName: string,
    repositoryEntityId: string,
  ): void {
    const existPreviewRepositoryTab = this.getExistPreviewTab(
      'repository',
      containerName,
      repositoryName,
    );

    if (existPreviewRepositoryTab.length === 1) {
      this.selectPreviewTab(existPreviewRepositoryTab[0].id);
    } else if (existPreviewRepositoryTab.length === 0) {
      const entity = this.createPreviewTabEntity(
        'repository',
        containerName,
        repositoryName,
        repositoryEntityId,
      );
      this.createPreviewTab(entity);
    }
  }

  previewWatchTab(
    containerName: string,
    watchName: string,
    watchEntityId: string,
  ): void {
    const existPreviewWatchTab = this.getExistPreviewTab(
      'watch',
      containerName,
      watchName,
    );

    if (existPreviewWatchTab.length === 1) {
      this.selectPreviewTab(existPreviewWatchTab[0].id);
    } else if (existPreviewWatchTab.length === 0) {
      const entity = this.createPreviewTabEntity(
        'watch',
        containerName,
        watchName,
        watchEntityId,
      );
      this.createPreviewTab(entity);
    }
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
    this.tabStore.update(
      setProps({
        selectedTabEntityId: tab.id,
        selectedContainerEntityId: tab.containerName,
      }),
    );
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

  private selectPreviewTab(tabId: string) {
    this.tabStore.update(
      setProps({
        selectedTabEntityId: tabId,
      }),
    );
  }

  private getExistPreviewTab(
    tabType: TabEntity['tabType'],
    containerName: string,
    foreignName: string,
  ) {
    return this.tabStore.query(
      getAllEntitiesApply({
        filterEntity: (entity) =>
          entity.tabType === 'widget' &&
          entity.containerName === containerName &&
          entity.widgetName === foreignName,
        ref: tabRef,
      }),
    );
  }

  private createPreviewTabEntity(
    tabType: TabEntity['tabType'],
    containerName: string,
    foreignName: string,
    foreignId: string,
  ) {
    const tabId = nanoid();

    let tab: TabEntity;

    if (tabType === 'widget') {
      tab = {
        id: tabId,
        tabType: 'widget',
        containerName,
        widgetName: foreignName,
        widgetEntityId: foreignId,
        isPreview: true,
        isEdit: false,
        hasError: false,
      };
    } else if (tabType === 'repository') {
      tab = {
        id: tabId,
        tabType: 'repository',
        containerName,
        repositoryName: foreignName,
        repositoryEntityId: foreignId,
        isPreview: true,
        isEdit: false,
        hasError: false,
      };
    } else if (tabType === 'watch') {
      tab = {
        id: tabId,
        tabType: 'watch',
        containerName,
        watchName: foreignName,
        watchEntityId: foreignId,
        isPreview: true,
        isEdit: false,
        hasError: false,
      };
    } else {
      throw new TypeException('Did not find specific tabType.');
    }

    return tab;
  }

  private createPreviewTab(tabEntity: TabEntity) {
    const previewTabs = this.tabStore.query(
      getAllEntitiesApply({
        filterEntity: (entity) => entity.isPreview,
        ref: tabRef,
      }),
    );
    const previewTabIds = previewTabs.map((tab) => tab.id);

    this.tabStore.update(
      deleteEntities(previewTabIds, { ref: tabRef }),
      addEntities(tabEntity, { ref: tabRef }),
      setProps({
        selectedTabEntityId: tabEntity.id,
      }),
    );
  }
}
