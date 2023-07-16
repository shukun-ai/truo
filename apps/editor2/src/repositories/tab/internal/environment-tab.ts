import { select, setProps } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  getAllEntitiesApply,
} from '@ngneat/elf-entities';

import { nanoid } from 'nanoid';

import { TabEntity, tabRef } from '../tab-ref';
import { tabStore } from '../tab-store';

export class EnvironmentTab {
  private readonly tabStore = tabStore;

  selectedEnvironmentEntityId$ = this.tabStore.pipe(
    select((state) => {
      const tabId = state.selectedTabEntityId;
      if (!tabId) {
        return null;
      }
      const tabEntity = state.tabEntities[tabId];
      if (tabEntity.tabType !== 'environment') {
        return null;
      }
      return tabEntity.environmentEntityId;
    }),
  );

  preview(environmentName: string, environmentEntityId: string): void {
    const existPreviewEnvironmentTab = this.getExistPreviewTab(environmentName);

    if (existPreviewEnvironmentTab.length === 1) {
      this.selectPreviewTab(existPreviewEnvironmentTab[0].id);
    } else if (existPreviewEnvironmentTab.length === 0) {
      const entity = this.createPreviewTabEntity(
        environmentName,
        environmentEntityId,
      );
      this.createPreviewTab(entity);
    }
  }

  private getExistPreviewTab(environmentName: string) {
    return this.tabStore.query(
      getAllEntitiesApply({
        filterEntity: (entity) =>
          entity.tabType === 'environment' &&
          entity.environmentName === environmentName,
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
    environmentName: string,
    environmentEntityId: string,
  ): TabEntity {
    const tabId = nanoid();

    return {
      id: tabId,
      tabType: 'environment',
      environmentName,
      environmentEntityId,
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
