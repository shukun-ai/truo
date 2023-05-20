import { select } from '@ngneat/elf';

import { ApiRequester } from '../apis/requester';

import { PresenterStore } from './presenter-store';

export class PresenterRepository {
  currentPresenter$ = this.presenterStore.pipe(
    select((state) => state.currentPresenter),
  );

  constructor(
    private readonly presenterStore: PresenterStore,
    private readonly apiRequester: ApiRequester,
  ) {}

  async fetchLatest(presenterName: string) {
    const response = await this.apiRequester.editorRequester.getPresenter();
    const presenter = response.data.value[presenterName];
    if (!presenter) {
      throw new Error('Did not find presenter.');
    }
    this.presenterStore.update((state) => ({
      ...state,
      currentPresenter: presenter,
    }));
  }
}
