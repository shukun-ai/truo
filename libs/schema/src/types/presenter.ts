/* eslint-disable */
/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type PresenterTreeNode = string;
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^(.)+$".
 */
export type PresenterScreen =
  | PresenterScreenDashboard
  | PresenterScreenWorkshop;

/**
 * Define the presenter contained Stores and UI Elements
 */
export interface PresenterSchema {
  $schema?: string;
  label: string;
  containers: {
    [k: string]: PresenterContainer;
  };
  screens: {
    [k: string]: PresenterScreen;
  };
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^(.)+$".
 */
export interface PresenterContainer {
  $schema?: string;
  type: 'page';
  repositories: PresenterRepositories;
  widgets: PresenterWidgets;
  tree: PresenterTreeNodes;
  watches: PresenterWatches;
}
export interface PresenterRepositories {
  [k: string]: PresenterRepository;
}
/**
 * This interface was referenced by `PresenterRepositories`'s JSON-Schema definition
 * via the `patternProperty` "^(.)+$".
 */
export interface PresenterRepository {
  type: string;
  parameters: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^(.)+$".
     */
    [k: string]:
      | string
      | unknown[]
      | {
          [k: string]: unknown;
        }
      | number
      | boolean;
  };
}
export interface PresenterWidgets {
  [k: string]: PresenterWidget;
}
/**
 * This interface was referenced by `PresenterWidgets`'s JSON-Schema definition
 * via the `patternProperty` "^(.)+$".
 */
export interface PresenterWidget {
  tag: string;
  parentSlot?: string;
  properties: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^(.)+$".
     */
    [k: string]:
      | string
      | unknown[]
      | {
          [k: string]: unknown;
        }
      | number
      | boolean;
  };
  events: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^(.)+$".
     */
    [k: string]: PresenterEvent[];
  };
}
export interface PresenterEvent {
  scope: 'app' | 'container';
  /**
   * Target for repository
   */
  target: string;
  /**
   * The action from repository
   */
  action: string;
  path?: string[];
  /**
   * convert the widget payload to repository input.
   */
  value?: string;
}
export interface PresenterTreeNodes {
  /**
   * This interface was referenced by `PresenterTreeNodes`'s JSON-Schema definition
   * via the `patternProperty` "^(.)+$".
   */
  [k: string]: PresenterTreeNode[];
}
export interface PresenterWatches {
  [k: string]: PresenterWatch;
}
/**
 * This interface was referenced by `PresenterWatches`'s JSON-Schema definition
 * via the `patternProperty` "^(.)+$".
 */
export interface PresenterWatch {
  trigger: {
    stateChanged?: string[][];
    containerMounted?: boolean;
    /**
     * The unit of interval is milliseconds.
     */
    interval?: number;
    [k: string]: unknown;
  };
  events: PresenterEvent[];
}
export interface PresenterScreenDashboard {
  layout: 'Dashboard';
  slots: {
    main: string;
    menu?: string;
  };
}
export interface PresenterScreenWorkshop {
  layout: 'Workshop';
  slots: {
    main: string;
    menu?: string;
  };
}
