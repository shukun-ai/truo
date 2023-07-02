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

import { presenterStore } from './presenter-store';
import { PresenterTabEntity, tabRef } from './tab-ref';

import { ITabRepository } from './tab-repository.interface';

export class TabRepository implements ITabRepository {
  private readonly presenterStore = presenterStore;

  allTabs$: Observable<PresenterTabEntity[]> = this.presenterStore.pipe(
    selectAllEntities({ ref: tabRef }),
  );

  selectedTabEntityId$: Observable<string | null> = this.presenterStore.pipe(
    select((state) => state.selectedTabEntityId),
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

  fixTab(tabId: string): void {
    this.presenterStore.update(
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
    this.presenterStore.update(
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
    this.presenterStore.update(
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
    const tab = this.presenterStore.query(getEntity(tabId, { ref: tabRef }));
    if (!tab) {
      throw new TypeException('Did not find tab: {{tabId}}', { tabId });
    }
    this.presenterStore.update(
      setProps({
        selectedTabEntityId: tab.id,
        selectedContainerEntityId: tab.containerName,
      }),
    );
  }

  closeTab(tabId: string): void {
    this.presenterStore.update(
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
    this.presenterStore.update(
      setProps({
        selectedTabEntityId: tabId,
      }),
    );
  }

  private getExistPreviewTab(
    tabType: PresenterTabEntity['tabType'],
    containerName: string,
    foreignName: string,
  ) {
    return this.presenterStore.query(
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
    tabType: PresenterTabEntity['tabType'],
    containerName: string,
    foreignName: string,
    foreignId: string,
  ) {
    const tabId = nanoid();

    let tab: PresenterTabEntity;

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
    } else {
      throw new TypeException('Did not find specific tabType.');
    }

    return tab;
  }

  private createPreviewTab(tabEntity: PresenterTabEntity) {
    const previewTabs = this.presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (entity) => entity.isPreview,
        ref: tabRef,
      }),
    );
    const previewTabIds = previewTabs.map((tab) => tab.id);

    this.presenterStore.update(
      deleteEntities(previewTabIds, { ref: tabRef }),
      addEntities(tabEntity, { ref: tabRef }),
      setProps({
        selectedTabEntityId: tabEntity.id,
      }),
    );
  }
}
