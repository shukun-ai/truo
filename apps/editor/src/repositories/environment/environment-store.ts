import { createStore, withProps } from '@ngneat/elf';

import { withEnvironment } from './environment-ref';

export type EnvironmentProps = {
  initialized: boolean;
  selectedEnvironmentId: string | null;
};

export const environmentStore = createStore(
  { name: 'environment' },
  withProps<EnvironmentProps>({
    initialized: false,
    selectedEnvironmentId: null,
  }),
  withEnvironment(),
);
