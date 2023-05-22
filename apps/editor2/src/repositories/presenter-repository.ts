import { select, setProps } from '@ngneat/elf';

import { PresenterContainer, PresenterTreeNodes } from '@shukun/schema';

import { Observable } from 'rxjs';

import { ApiRequester } from '../apis/requester';

import { write } from './mutations';
import { presenterStore } from './presenter-store';

export class PresenterRepository {
  presenterStore = presenterStore;

  currentPresenter$ = this.presenterStore.pipe(
    select((state) => state.currentPresenter),
  );

  selectedContainerId$ = this.presenterStore.pipe(
    select((state) => state.selectedContainerId),
  );

  selectedTreeNodes$: Observable<PresenterTreeNodes> = this.presenterStore.pipe(
    select((state) => {
      const selectedContainerId = state.selectedContainerId;
      if (!selectedContainerId) {
        return {};
      }
      const container = state.currentPresenter.containers[selectedContainerId];
      if (!container) {
        return {};
      }
      return container.tree;
    }),
  );

  constructor(private readonly apiRequester: ApiRequester) {}

  async fetchLatest(presenterName: string) {
    const response = await this.apiRequester.editorRequester.getPresenter();
    const presenter = response.data.value[presenterName];
    if (!presenter) {
      throw new Error('Did not find presenter.');
    }
    this.presenterStore.update(
      setProps({
        currentPresenter: presenter,
      }),
    );
  }

  isUniqueContainerName(containerName: string) {
    const { currentPresenter } = this.presenterStore.getValue();
    const container = currentPresenter.containers[containerName];
    return !container;
  }

  chooseContainer(containerId: string) {
    this.presenterStore.update(
      write((state) => (state.selectedContainerId = containerId)),
    );
  }

  createContainer(containerName: string) {
    const newContainer: PresenterContainer = {
      type: 'page',
      repositories: {},
      widgets: {},
      root: [],
      tree: {},
    };

    this.presenterStore.update(
      write((state) => {
        state.currentPresenter.containers[containerName] = newContainer;
      }),
    );
  }

  removeContainer(containerName: string) {
    this.presenterStore.update(
      write((state) => {
        delete state.currentPresenter.containers[containerName];
      }),
    );
  }
}
