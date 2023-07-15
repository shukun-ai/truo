import { select, setProps } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  getAllEntitiesApply,
} from '@ngneat/elf-entities';

import { nanoid } from 'nanoid';

import { TabEntity, tabRef } from '../tab-ref';
import { tabStore } from '../tab-store';

export class MetadataTab {
  private readonly tabStore = tabStore;

  selectedMetadataEntityId$ = this.tabStore.pipe(
    select((state) => {
      const tabId = state.selectedTabEntityId;
      if (!tabId) {
        return null;
      }
      const tabEntity = state.tabEntities[tabId];
      if (tabEntity.tabType !== 'metadata') {
        return null;
      }
      return tabEntity.metadataEntityId;
    }),
  );

  preview(metadataName: string, metadataEntityId: string): void {
    const existPreviewMetadataTab = this.getExistPreviewTab(metadataName);

    if (existPreviewMetadataTab.length === 1) {
      this.selectPreviewTab(existPreviewMetadataTab[0].id);
    } else if (existPreviewMetadataTab.length === 0) {
      const entity = this.createPreviewTabEntity(
        metadataName,
        metadataEntityId,
      );
      this.createPreviewTab(entity);
    }
  }

  private getExistPreviewTab(metadataName: string) {
    return this.tabStore.query(
      getAllEntitiesApply({
        filterEntity: (entity) =>
          entity.tabType === 'metadata' && entity.metadataName === metadataName,
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
    metadataName: string,
    metadataEntityId: string,
  ): TabEntity {
    const tabId = nanoid();

    return {
      id: tabId,
      tabType: 'metadata',
      metadataName,
      metadataEntityId,
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
