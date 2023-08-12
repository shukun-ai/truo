import { select, setProps } from '@ngneat/elf';
import {
  deleteEntities,
  getEntity,
  updateEntities,
} from '@ngneat/elf-entities';

import { TypeException } from '@shukun/exception';

import { TabEntity, tabRef } from './tab-ref';

import { tabStore } from './tab-store';

export const tabRepository = {
  tabs$: tabStore.pipe(select((state) => state.tabEntities)),

  preview(tabType: TabEntity['tabType'], foreignId: string): void {
    // widgetTab.preview(widgetEntityId);
  },

  fix(tabId: string): void {
    tabStore.update(
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
  },

  activeEditing(tabId: string): void {
    tabStore.update(
      updateEntities(
        tabId,
        {
          isEdit: true,
        },
        { ref: tabRef },
      ),
    );
  },

  inactiveEditing(tabId: string): void {
    tabStore.update(
      updateEntities(
        tabId,
        {
          isEdit: false,
        },
        { ref: tabRef },
      ),
    );
  },

  choose(tabId: string): void {
    const tab = tabStore.query(getEntity(tabId, { ref: tabRef }));
    if (!tab) {
      throw new TypeException('Did not find tab: {{tabId}}', { tabId });
    }
    const props =
      'containerName' in tab
        ? {
            selectedTabEntityId: tab.id,
            selectedContainerEntityId: tab.containerName,
          }
        : {
            selectedTabEntityId: tab.id,
          };

    tabStore.update(setProps(props));
  },

  close(tabId: string): void {
    tabStore.update(
      deleteEntities(tabId, { ref: tabRef }),
      setProps((state) => {
        const entities = Object.values(state.tabEntities);

        return {
          selectedTabEntityId: entities.length > 0 ? entities[0].id : null,
        };
      }),
    );
  },
};
