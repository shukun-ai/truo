import { setProps } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  getAllEntitiesApply,
} from '@ngneat/elf-entities';

import { nanoid } from 'nanoid';

import { TabEntity, tabRef } from '../tab-ref';
import { tabStore } from '../tab-store';

export class ContainersTab {
  private readonly tabStore = tabStore;

  preview(): void {
    const existPreviewTab = this.getExistPreviewTab();

    if (existPreviewTab.length === 1) {
      this.selectPreviewTab(existPreviewTab[0].id);
    } else if (existPreviewTab.length === 0) {
      const entity = this.createPreviewTabEntity();
      this.createPreviewTab(entity);
    }
  }

  private getExistPreviewTab() {
    return this.tabStore.query(
      getAllEntitiesApply({
        filterEntity: (entity) => entity.tabType === 'containers',
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

  private createPreviewTabEntity(): TabEntity {
    const tabId = nanoid();

    return {
      id: tabId,
      tabType: 'containers',
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
