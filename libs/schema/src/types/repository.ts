/* eslint-disable */
/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Define the presenter repository definitions
 */
export interface RepositorySchema {
  $schema?: string;
  name: string;
  description?: string;
  scope: 'app' | 'container';
  parameters: {
    [k: string]: RepositoryParameter;
  };
  actions: {
    [k: string]: RepositoryAction;
  };
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^(.)+$".
 */
export interface RepositoryParameter {
  label: string;
  type: 'json' | 'jsonSchema' | 'atomName' | 'connectorName';
  required?: boolean;
  enums?: string[];
  placeholder?: string;
  description?: string;
  defaultValue?: unknown;
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^(.)+$".
 */
export interface RepositoryAction {
  description?: string;
  enabledPath?: boolean;
  enabledValue?: boolean;
}
