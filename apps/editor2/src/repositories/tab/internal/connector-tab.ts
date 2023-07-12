import { select, setProps } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  getAllEntitiesApply,
} from '@ngneat/elf-entities';

import { nanoid } from 'nanoid';

import { TabEntity, tabRef } from '../tab-ref';
import { tabStore } from '../tab-store';

export class ConnectorTab {
  private readonly tabStore = tabStore;

  selectedConnectorEntityId$ = this.tabStore.pipe(
    select((state) => {
      const tabId = state.selectedTabEntityId;
      if (!tabId) {
        return null;
      }
      const tabEntity = state.tabEntities[tabId];
      if (tabEntity.tabType !== 'connector') {
        return null;
      }
      return tabEntity.connectorEntityId;
    }),
  );

  preview(connectorName: string, connectorEntityId: string): void {
    const existPreviewConnectorTab = this.getExistPreviewTab(connectorName);

    if (existPreviewConnectorTab.length === 1) {
      this.selectPreviewTab(existPreviewConnectorTab[0].id);
    } else if (existPreviewConnectorTab.length === 0) {
      const entity = this.createPreviewTabEntity(
        connectorName,
        connectorEntityId,
      );
      this.createPreviewTab(entity);
    }
  }

  private getExistPreviewTab(connectorName: string) {
    return this.tabStore.query(
      getAllEntitiesApply({
        filterEntity: (entity) =>
          entity.tabType === 'connector' &&
          entity.connectorName === connectorName,
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
    connectorName: string,
    connectorEntityId: string,
  ): TabEntity {
    const tabId = nanoid();

    return {
      id: tabId,
      tabType: 'connector',
      connectorName,
      connectorEntityId,
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
