import {
  addEntities,
  deleteEntities,
  getAllEntitiesApply,
  selectAllEntities,
} from '@ngneat/elf-entities';

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

  previewWidgetTab(widgetId: string): void {
    const previewTabs = this.presenterStore.query(
      getAllEntitiesApply({
        filterEntity: (entity) => entity.isPreview,
        ref: tabRef,
      }),
    );
    const previewTabIds = previewTabs.map((tab) => tab.id);
    this.presenterStore.update(
      deleteEntities(previewTabIds, { ref: tabRef }),
      addEntities(
        {
          id: nanoid(),
          tabType: 'widget',
          widgetId,
          isPreview: true,
          isEdit: false,
          hasError: false,
        },
        { ref: tabRef },
      ),
    );
  }

  openWidgetTab(widgetId: string): void {}

  chooseTab(tabId: string): void {}

  closeTab(tabId: string): void {}
}
