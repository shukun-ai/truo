import { BehaviorSubject } from 'rxjs';

export const INACTIVE_DROPPABLE_HEIGHT = 8;
export const ACTIVE_DROPPABLE_HEIGHT = 28;
export const LEFT_INDENT_WIDTH = 16;
export const TREE_NODE_TYPE = 'TREE_ITEM';

export const activeNodeName$ = new BehaviorSubject<string | undefined>(
  'wrapper',
);
