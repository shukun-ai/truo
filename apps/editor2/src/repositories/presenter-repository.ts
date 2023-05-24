import { select, setProps } from '@ngneat/elf';
import { TypeException } from '@shukun/exception';
import {
  PresenterContainer,
  PresenterTreeNodes,
  PresenterWidgets,
} from '@shukun/schema';

import { Observable } from 'rxjs';

import { ApiRequester } from '../apis/requester';

import { write } from './mutations';
import {
  addSiblingNode,
  moveToBeside,
  moveToInside,
  removeNode,
} from './presenter/move-node';
import { createRandomWidgetId } from './presenter/random-widget-id';
import { PresenterProps, presenterStore } from './presenter-store';

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

  selectedWidgets$: Observable<PresenterWidgets> = this.presenterStore.pipe(
    select((state) => {
      const selectedContainerId = state.selectedContainerId;
      if (!selectedContainerId) {
        return {};
      }
      const container = state.currentPresenter.containers[selectedContainerId];
      if (!container) {
        return {};
      }
      return container.widgets;
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

  moveToBeside(
    sourceNodeId: string,
    targetNodeId: string,
    position: 'before' | 'after',
  ) {
    this.presenterStore.update(
      write((state) => {
        const container = this.getSelectedContainer(state);
        const tree = moveToBeside(
          container.tree,
          sourceNodeId,
          targetNodeId,
          position,
        );
        container.tree = tree;
      }),
    );
  }

  moveToInside(sourceNodeId: string, targetNodeId: string) {
    this.presenterStore.update(
      write((state) => {
        const container = this.getSelectedContainer(state);
        const tree = moveToInside(container.tree, sourceNodeId, targetNodeId);
        container.tree = tree;
      }),
    );
  }

  removeTreeNode(sourceNodeId: string) {
    this.presenterStore.update(
      write((state) => {
        const container = this.getSelectedContainer(state);
        const tree = removeNode(container.tree, sourceNodeId);
        container.tree = tree;
      }),
      write((state) => {
        const container = this.getSelectedContainer(state);
        delete container.widgets[sourceNodeId];
      }),
    );
  }

  addWidgetIntoSiblingNode(
    newWidgetTag: string,
    newWidgetTitle: string,
    targetNodeId: string,
  ) {
    this.presenterStore.update(
      write((state) => {
        const container = this.getSelectedContainer(state);
        const existWidgetIds = Object.keys(container.widgets);
        const newNodeId = createRandomWidgetId(existWidgetIds);
        const tree = addSiblingNode(container.tree, newNodeId, targetNodeId);
        container.tree = tree;
        container.widgets[newNodeId] = {
          tag: newWidgetTag,
          title: newWidgetTitle,
          properties: {},
          events: {},
        };
      }),
    );
  }

  private getSelectedContainer(state: PresenterProps): PresenterContainer {
    const containerId = state.selectedContainerId;
    if (!containerId) {
      throw new TypeException('Did not find containerId: {{containerId}}', {
        containerId,
      });
    }
    const container = state.currentPresenter.containers[containerId];
    if (!container) {
      throw new TypeException('Did not find container: {{containerId}}', {
        containerId,
      });
    }
    return container;
  }
}
