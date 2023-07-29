import { select, setProps } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  getAllEntitiesApply,
} from '@ngneat/elf-entities';

import { nanoid } from 'nanoid';

import { TabEntity, tabRef } from '../tab-ref';
import { tabStore } from '../tab-store';

export class RepositoryTab {
  private readonly tabStore = tabStore;

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

  preview(
    containerName: string,
    repositoryName: string,
    repositoryEntityId: string,
  ): void {
    const existPreviewRepositoryTab = this.getExistPreviewTab(
      containerName,
      repositoryName,
    );

    if (existPreviewRepositoryTab.length === 1) {
      this.selectPreviewTab(existPreviewRepositoryTab[0].id);
    } else if (existPreviewRepositoryTab.length === 0) {
      const entity = this.createPreviewTabEntity(
        containerName,
        repositoryName,
        repositoryEntityId,
      );
      this.createPreviewTab(entity);
    }
  }

  private getExistPreviewTab(containerName: string, repositoryName: string) {
    return this.tabStore.query(
      getAllEntitiesApply({
        filterEntity: (entity) =>
          entity.tabType === 'repository' &&
          entity.containerName === containerName &&
          entity.repositoryName === repositoryName,
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
    repositoryName: string,
    repositoryEntityId: string,
  ): TabEntity {
    const tabId = nanoid();

    return {
      id: tabId,
      tabType: 'repository',
      containerName,
      repositoryName,
      repositoryEntityId,
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
