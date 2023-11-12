import { createStore, withProps } from '@ngneat/elf';

import { withView } from './view-ref';

export type ViewProps = {
  initialized: boolean;
};

export const viewStore = createStore(
  { name: 'view' },
  withProps<ViewProps>({
    initialized: false,
  }),
  withView(),
);
