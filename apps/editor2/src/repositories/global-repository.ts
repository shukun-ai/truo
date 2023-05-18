import { select } from '@ngneat/elf';

import { ApiRequester } from '../apis/requester';

import { GlobalStore } from './global-store';

export class GlobalRepository {
  presenters$ = this.globalStore.pipe(select((state) => state.presenters));

  constructor(
    private readonly globalStore: GlobalStore,
    private readonly apiRequester: ApiRequester,
  ) {}

  async fetchPresenters() {
    const response = await this.apiRequester.editorRequester.getPresenter();
    const presenters = Object.entries(response.data.value).map(
      ([name, definition]) => ({
        name,
        definition,
      }),
    );

    this.globalStore.update((state) => ({
      ...state,
      presenters,
    }));
  }
}
