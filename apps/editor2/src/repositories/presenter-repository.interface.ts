import {
  PresenterSchema,
  PresenterTreeNodes,
  PresenterWidgets,
  WidgetSchema,
} from '@shukun/schema';
import { Observable } from 'rxjs';

import { PresenterTreeCollapse } from './presenter/tree-ui-ref';

export interface IPresenterRepository {
  currentPresenter$: Observable<PresenterSchema>;
  widgetDefinitions$: Observable<Record<string, WidgetSchema>>;
  selectedContainerId$: Observable<string | null>;
  selectedWidgetId$: Observable<string | null>;
  selectedTreeNodes$: Observable<PresenterTreeNodes>;
  selectedTreeCollapses$: Observable<Record<string, PresenterTreeCollapse>>;
  selectedWidgets$: Observable<PresenterWidgets>;
  selectedDefinition$: Observable<WidgetSchema | null>;

  fetchLatest(presenterName: string): Promise<void>;
  isUniqueContainerName(containerName: string): boolean;
  selectContainer(containerId: string): void;
  selectedWidget(widgetId: string): void;
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
