import { BehaviorSubject } from 'rxjs';

export type TreeConfig = Record<string, string[]>;
export type CollapseConfig = Record<string, boolean>;

export const INACTIVE_DROPPABLE_HEIGHT = 8;
export const ACTIVE_DROPPABLE_HEIGHT = 34;
export const LEFT_INDENT_WIDTH = 20;

export const treeConfig$ = new BehaviorSubject<TreeConfig>({
  root: ['wrapper'],
  wrapper: ['title', 'input', 'button'],
  title: ['primaryTitle', 'secondaryTitle'],
  input: [],
  button: [],
});

export const collapseStore$ = new BehaviorSubject<CollapseConfig>({});

// collapseStore$.subscribe((collapseStore) => {
//   console.log('collapseStore change', collapseStore);
// });

export const activeNodeName$ = new BehaviorSubject<string | undefined>(
  'wrapper',
);
