import { createStore, withProps } from '@ngneat/elf';
import { PresenterSchema } from '@shukun/schema';

export type PresenterProps = {
  currentPresenter: PresenterSchema;
};

export const presenterStore = createStore(
  { name: 'presenter' },
  withProps<PresenterProps>({
    currentPresenter: {
      title: '未命名',
      containers: {},
      screens: {},
    },
  }),
);

export type PresenterUIProps = {
  selectedContainerName: string | null;
};

export const presenterUIStore = createStore(
  { name: 'presenterUI' },
  withProps<PresenterUIProps>({
    selectedContainerName: null,
  }),
);
