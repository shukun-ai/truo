import { select } from '@ngneat/elf';

import { ApiRequester } from '../apis/requester';

import { dashboardStore } from './dashboard-store';

export class DashboardRepository {
  presenters$ = dashboardStore.pipe(select((state) => state.presenters));

  constructor(private readonly apiRequester: ApiRequester) {}

  async fetchPresenters() {
    const response = await this.apiRequester.editorRequester.getPresenter();
    const presenters = Object.entries(response.data.value).map(
      ([name, definition]) => ({
        name,
        definition,
      }),
    );

    dashboardStore.update((state) => ({
      ...state,
      presenters,
    }));
  }
}
