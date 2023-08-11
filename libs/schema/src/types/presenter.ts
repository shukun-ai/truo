/* eslint-disable */
/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^(.)+$".
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^(.)+$".
 */
export type PresenterParameter =
  | string
  | unknown[]
  | {
      [k: string]: unknown;
    }
  | number
  | boolean;
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^(.)+$".
 */
export type PresenterNode = string;

/**
 * Define the presenter contained Stores and UI Elements
 */
export interface PresenterSchema {
  $schema?: string;
  label: string;
  widgets: {
    [k: string]: PresenterWidget;
  };
  nodes: {
    [k: string]: PresenterNode;
  };
  repositories: {
    [k: string]: PresenterRepository;
  };
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^(.)+$".
 */
export interface PresenterWidget {
  tag: string;
  label: string;
  parentSlot?: string;
  properties: {
    [k: string]: PresenterParameter;
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
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^(.)+$".
 */
export interface PresenterRepository {
  type: string;
  parameters: {
    [k: string]: PresenterParameter;
  };
}
