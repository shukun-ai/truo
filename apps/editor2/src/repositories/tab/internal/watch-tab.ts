import { select, setProps } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  getAllEntitiesApply,
} from '@ngneat/elf-entities';

import { nanoid } from 'nanoid';

import { TabEntity, tabRef } from '../tab-ref';
import { tabStore } from '../tab-store';

export class WatchTab {
  private readonly tabStore = tabStore;

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

  preview(
    containerName: string,
    watchName: string,
    watchEntityId: string,
  ): void {
    const existPreviewWatchTab = this.getExistPreviewTab(
      containerName,
      watchName,
    );

    if (existPreviewWatchTab.length === 1) {
      this.selectPreviewTab(existPreviewWatchTab[0].id);
    } else if (existPreviewWatchTab.length === 0) {
      const entity = this.createPreviewTabEntity(
        containerName,
        watchName,
        watchEntityId,
      );
      this.createPreviewTab(entity);
    }
  }

  private getExistPreviewTab(containerName: string, watchName: string) {
    return this.tabStore.query(
      getAllEntitiesApply({
        filterEntity: (entity) =>
          entity.tabType === 'watch' &&
          entity.containerName === containerName &&
          entity.watchName === watchName,
        ref: tabRef,
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

  private createPreviewTabEntity(
    containerName: string,
    watchName: string,
    watchEntityId: string,
  ): TabEntity {
    const tabId = nanoid();

    return {
      id: tabId,
      tabType: 'watch',
      containerName,
      watchName,
      watchEntityId,
      isPreview: true,
      isEdit: false,
      hasError: false,
    };
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
