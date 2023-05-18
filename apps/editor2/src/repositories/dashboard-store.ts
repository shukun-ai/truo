import { createStore, withProps } from '@ngneat/elf';

import { PresenterSchema } from '@shukun/schema';

export type DashboardProps = {
  presenters: { name: string; definition: PresenterSchema }[];
};

export const dashboardDefaultState: DashboardProps = {
  presenters: [],
};

export const dashboardStore = createStore(
  { name: 'dashboard' },
  withProps<DashboardProps>(dashboardDefaultState),
);
