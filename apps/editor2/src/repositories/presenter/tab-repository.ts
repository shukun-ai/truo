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

  selectedTabId$: Observable<string | null> = this.presenterStore.pipe(
    select((state) => state.selectedTabId),
  );

  previewWidgetTab(containerId: string, widgetId: string): void {
    const previewTabs = this.presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (entity) => entity.isPreview,
        ref: tabRef,
      }),
    );
    const existPreviewWidgetTab = this.presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (entity) =>
          entity.tabType === 'widget' &&
          entity.containerId === containerId &&
          entity.widgetId === widgetId,
        ref: tabRef,
      }),
    );

    if (existPreviewWidgetTab.length === 1) {
      this.selectPreviewWidgetTab(existPreviewWidgetTab[0].id);
    } else if (existPreviewWidgetTab.length === 0) {
      const previewTabIds = previewTabs.map((tab) => tab.id);
      this.createPreviewWidgetTab(previewTabIds, containerId, widgetId);
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
        selectedTabId: tabId,
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
        selectedTabId: tab.id,
        selectedContainerId: tab.containerId,
      }),
    );
  }

  closeTab(tabId: string): void {
    this.presenterStore.update(
      deleteEntities(tabId, { ref: tabRef }),
      setProps((state) => {
        const entities = Object.values(state.presenterTabEntities);

        return {
          selectedTabId: entities.length > 0 ? entities[0].id : null,
        };
      }),
    );
  }

  private selectPreviewWidgetTab(tabId: string) {
    this.presenterStore.update(
      setProps({
        selectedTabId: tabId,
      }),
    );
  }

  private createPreviewWidgetTab(
    currentPreviewTabIds: string[],
    containerId: string,
    widgetId: string,
  ) {
    const tabId = nanoid();
    this.presenterStore.update(
      deleteEntities(currentPreviewTabIds, { ref: tabRef }),
      addEntities(
        {
          id: tabId,
          tabType: 'widget',
          containerId,
          widgetId,
          isPreview: true,
          isEdit: false,
          hasError: false,
        },
        { ref: tabRef },
      ),
      setProps({
        selectedTabId: tabId,
      }),
    );
  }
}
