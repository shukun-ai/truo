import { createStore, withProps } from '@ngneat/elf';

import { withTask } from './task-ref';

export type TaskProps = {
  //
};

export const taskStore = createStore(
  { name: 'task' },
  withProps<TaskProps>({}),
  withTask(),
);
