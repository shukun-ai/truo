import { select, setProps } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  getAllEntitiesApply,
  selectAllEntities,
  updateEntities,
} from '@ngneat/elf-entities';

import { nanoid } from 'nanoid';

import { Observable } from 'rxjs';

import { presenterStore } from './presenter-store';
import { PresenterTabEntity, tabRef } from './tab-ref';

import { ITabRepository } from './tab-repository.interface';
import { getWidgetEntityId } from './widget-ref';

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
    const previewTabIds = previewTabs.map((tab) => tab.id);
    const tabId = nanoid();
    this.presenterStore.update(
      deleteEntities(previewTabIds, { ref: tabRef }),
      addEntities(
        {
          id: tabId,
          tabType: 'widget',
          widgetId: getWidgetEntityId(containerId, widgetId),
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

  chooseTab(tabId: string): void {
    this.presenterStore.update(
      setProps({
        selectedTabId: tabId,
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
}
