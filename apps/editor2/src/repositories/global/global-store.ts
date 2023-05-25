import { createStore, withProps } from '@ngneat/elf';

import { PresenterSchema } from '@shukun/schema';

export type GlobalProps = {
  presenters: { name: string; definition: PresenterSchema }[];
};

export const globalStore = createStore(
  { name: 'global' },
  withProps<GlobalProps>({
    presenters: [],
  }),
);
