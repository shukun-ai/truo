import { Store, StoreDef, createStore, withProps } from '@ngneat/elf';

import { PresenterSchema } from '@shukun/schema';

export type GlobalProps = {
  presenters: { name: string; definition: PresenterSchema }[];
};

export type GlobalStore = Store<StoreDef<GlobalProps>, GlobalProps>;

export const globalDefaultState: GlobalProps = {
  presenters: [],
};

export const globalStore: GlobalStore = createStore(
  { name: 'global' },
  withProps<GlobalProps>(globalDefaultState),
);
