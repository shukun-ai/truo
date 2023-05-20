import { select } from '@ngneat/elf';

import { ApiRequester } from '../apis/requester';

import { globalStore } from './global-store';

export class GlobalRepository {
  globalStore = globalStore;

  presenters$ = this.globalStore.pipe(select((state) => state.presenters));

  constructor(private readonly apiRequester: ApiRequester) {}

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
