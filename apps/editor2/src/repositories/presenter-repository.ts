import { selectAllEntities, setEntities } from '@ngneat/elf-entities';

import { ApiRequester } from '../apis/requester';

import { presenterStore } from './presenter-store';

export class PresenterRepository {
  entities$ = presenterStore.pipe(selectAllEntities());

  constructor(private readonly apiRequester: ApiRequester) {}

  async findAll() {
    const response = await this.apiRequester.editorRequester.getPresenter();
    const presenters = Object.entries(response.data.value).map(
      ([name, definition]) => ({
        name,
        definition,
      }),
    );

    presenterStore.update(setEntities(presenters));
  }
}
