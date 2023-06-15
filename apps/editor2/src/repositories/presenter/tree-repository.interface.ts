import { PresenterTreeNodes } from '@shukun/schema';
import { Observable } from 'rxjs';

import { PresenterTreeCollapse } from './tree-ui-ref';

export interface ITreeRepository {
  selectedTreeNodes$: Observable<PresenterTreeNodes>;
  selectedTreeCollapses$: Observable<Record<string, PresenterTreeCollapse>>;
  moveToBeside(
    sourceNodeId: string,
    targetNodeId: string,
    position: 'before' | 'after',
  ): void;
  moveToInside(sourceNodeId: string, targetNodeId: string): void;
  removeTreeNode(sourceNodeId: string): void;
  closeTreeCollapse(sourceNodeId: string): void;
  openTreeCollapse(sourceNodeId: string): void;
  addWidget(
    type: 'sibling' | 'insert',
    newWidgetTag: string,
    newWidgetTitle: string,
    targetNodeId: string,
  ): void;
}
