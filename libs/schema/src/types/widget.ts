/* eslint-disable */
/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type ReferenceDataSchema =
  | boolean
  | {
      $id?: string;
      $schema?: string;
      $ref?: string;
      $comment?: string;
      title?: string;
      description?: string;
      items?:
        | ReferenceDataSchema
        | [ReferenceDataSchema, ...ReferenceDataSchema[]];
      required?: string[];
      additionalProperties?: ReferenceDataSchema;
      definitions?: {
        [k: string]: ReferenceDataSchema;
      };
      properties?: {
        [k: string]: ReferenceDataSchema;
      };
      patternProperties?: {
        [k: string]: ReferenceDataSchema;
      };
      const?: true;
      enum?: [true, ...unknown[]];
      type?:
        | 'array'
        | 'boolean'
        | 'integer'
        | 'null'
        | 'number'
        | 'object'
        | 'string';
      [k: string]: unknown;
    };

/**
 * Define the presenter contained Stores and UI Elements
 */
export interface WidgetSchema {
  $schema?: string;
  tag: string;
  experimental?: boolean;
  properties: {
    [k: string]: WidgetProperty;
  };
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^(\w)+$".
 */
export interface WidgetProperty {
  schema: ReferenceDataSchema;
  defaultValue?: unknown;
  isEvent?: boolean;
  label: string;
  placeholder?: string;
  description?: string;
}
