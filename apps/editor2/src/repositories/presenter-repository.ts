import { select } from '@ngneat/elf';

import { PresenterContainer } from '@shukun/schema';

import { Observable, combineLatest, distinctUntilChanged, map } from 'rxjs';

import { ApiRequester } from '../apis/requester';

import { write } from './mutations';
import {
  PresenterContainerTree,
  presenterStore,
  presenterUIStore,
} from './presenter-store';

export class PresenterRepository {
  presenterStore = presenterStore;

  presenterUIStore = presenterUIStore;

  currentPresenter$ = this.presenterStore.pipe(
    select((state) => state.currentPresenter),
  );

  selectedContainerName$ = this.presenterUIStore.pipe(
    select((state) => state.selectedContainerName),
  );

  selectedTree$: Observable<PresenterContainerTree> = combineLatest([
    this.presenterStore,
    this.presenterUIStore,
  ]).pipe(
    map(([presenterStore, presenterUIStore]) => {
      const containerName = presenterUIStore.selectedContainerName;
      if (!containerName) {
        return [];
      }
      const container =
        presenterStore.currentPresenter.containers[containerName];
      if (!container) {
        return [];
      }
      return Object.entries(container.widgets).map(([widgetId, widget]) => ({
        widgetId,
        widgetTitle: widget.title || '未命名组件',
        parentWidgetId: widget.parent ?? null,
      }));
    }),
    distinctUntilChanged(),
  );

  constructor(private readonly apiRequester: ApiRequester) {}

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

  isUniqueContainerName(containerName: string) {
    const { currentPresenter } = this.presenterStore.getValue();
    const container = currentPresenter.containers[containerName];
    return !container;
  }

  chooseContainer(containerName: string) {
    this.presenterUIStore.update(
      write((state) => (state.selectedContainerName = containerName)),
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
