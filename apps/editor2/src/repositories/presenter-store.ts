import { createStore } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';
import { PresenterSchema } from '@shukun/schema';

export type PresenterProps = {
  name: string;
  definition: PresenterSchema;
};

export const presenterStore = createStore(
  { name: 'presenter' },
  withEntities<PresenterProps, 'name'>({ idKey: 'name' }),
);
