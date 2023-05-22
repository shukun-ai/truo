import { createStore, withProps } from '@ngneat/elf';
import { PresenterSchema } from '@shukun/schema';

export type PresenterProps = {
  currentPresenter: PresenterSchema;
  selectedContainerId: string | null;
};

export const presenterStore = createStore(
  { name: 'presenter' },
  withProps<PresenterProps>({
    currentPresenter: {
      title: '未命名',
      containers: {},
      screens: {},
    },
    selectedContainerId: null,
  }),
);
