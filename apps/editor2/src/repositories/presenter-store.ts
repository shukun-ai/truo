import { createStore, withProps, Store, StoreDef } from '@ngneat/elf';
import { PresenterSchema } from '@shukun/schema';

export type PresenterProps = {
  currentPresenter: PresenterSchema;
};

export type PresenterStore = Store<StoreDef<PresenterProps>, PresenterProps>;

export const presenterStore: PresenterStore = createStore(
  { name: 'presenter' },
  withProps<PresenterProps>({
    currentPresenter: {
      title: '未命名',
      containers: {},
      screens: {},
    },
  }),
);
