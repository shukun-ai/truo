import { createStore, withProps } from '@ngneat/elf';

import { withTab } from './tab-ref';

export type TabProps = {
  selectedTabEntityId: string | null;
};

export const tabStore = createStore(
  { name: 'tab' },
  withProps<TabProps>({
    selectedTabEntityId: null,
  }),
  withTab(),
);
