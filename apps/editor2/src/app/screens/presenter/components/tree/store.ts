import { BehaviorSubject } from 'rxjs';

export type TreeConfig = Record<string, string[]>;
export type CollapseConfig = Record<string, boolean>;

export const INACTIVE_DROPPABLE_HEIGHT = 8;
export const ACTIVE_DROPPABLE_HEIGHT = 34;
export const LEFT_INDENT_WIDTH = 20;
export const TREE_NODE_TYPE = 'TREE_ITEM';

export const collapseStore$ = new BehaviorSubject<CollapseConfig>({});

export const activeNodeName$ = new BehaviorSubject<string | undefined>(
  'wrapper',
);
