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
  scope: 'app' | 'container';
  manualJsonSchema?: boolean;
  parameters: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^(\w)+$".
     */
    [k: string]: {
      editorType: 'json' | 'atomName' | 'flowName';
      required: boolean;
    };
  };
}
