import { PresenterSchema, PresenterTreeNodes } from '@shukun/schema';
import { Observable } from 'rxjs';

import { PresenterContainerEntity } from './container-ref';
import { PresenterTreeCollapse } from './tree-ui-ref';

export interface IContainerRepository {
  allContainers$: Observable<PresenterContainerEntity[]>;
  selectedTreeNodes$: Observable<PresenterTreeNodes>;
  selectedTreeCollapses$: Observable<Record<string, PresenterTreeCollapse>>;

  initialize(presenter: PresenterSchema): void;

  isUniqueContainerName(containerName: string): boolean;
  selectContainer(containerId: string): void;
  createContainer(containerName: string): void;
  removeContainer(containerName: string): void;

  moveToBeside(
    sourceNodeId: string,
    targetNodeId: string,
    position: 'before' | 'after',
  ): void;
  moveToInside(sourceNodeId: string, targetNodeId: string): void;
  removeTreeNode(sourceNodeId: string): void;
  closeTreeCollapse(sourceNodeId: string): void;
  openTreeCollapse(sourceNodeId: string): void;
  addWidgetIntoSiblingNode(
    newWidgetTag: string,
    newWidgetTitle: string,
    targetNodeId: string,
  ): void;
}
