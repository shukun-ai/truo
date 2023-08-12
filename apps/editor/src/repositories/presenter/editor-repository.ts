import { setProps } from '@ngneat/elf';

import { ActivityTab, presenterStore } from './presenter-store';

export const editorRepository = {
  chooseActivityTab: (tab: ActivityTab | null) => {
    presenterStore.update(
      setProps(() => ({
        selectedActivityTab: tab,
      })),
    );
  },
};
