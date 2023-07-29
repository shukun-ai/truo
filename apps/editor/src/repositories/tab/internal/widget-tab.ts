import { select, setProps } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  getAllEntitiesApply,
} from '@ngneat/elf-entities';

import { nanoid } from 'nanoid';

import { TabEntity, tabRef } from '../tab-ref';
import { tabStore } from '../tab-store';

export class WidgetTab {
  private readonly tabStore = tabStore;

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

  preview(
    containerName: string,
    widgetName: string,
    widgetEntityId: string,
  ): void {
    const existPreviewWidgetTab = this.getExistPreviewTab(
      containerName,
      widgetName,
    );

    if (existPreviewWidgetTab.length === 1) {
      this.selectPreviewTab(existPreviewWidgetTab[0].id);
    } else if (existPreviewWidgetTab.length === 0) {
      const entity = this.createPreviewTabEntity(
        containerName,
        widgetName,
        widgetEntityId,
      );
      this.createPreviewTab(entity);
    }
  }

  private getExistPreviewTab(containerName: string, widgetName: string) {
    return this.tabStore.query(
      getAllEntitiesApply({
        filterEntity: (entity) =>
          entity.tabType === 'widget' &&
          entity.containerName === containerName &&
          entity.widgetName === widgetName,
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
    widgetName: string,
    widgetEntityId: string,
  ): TabEntity {
    const tabId = nanoid();

    return {
      id: tabId,
      tabType: 'widget',
      containerName,
      widgetName,
      widgetEntityId,
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
