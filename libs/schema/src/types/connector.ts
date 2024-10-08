/* eslint-disable */
/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Describe Connector Schema
 */
export interface ConnectorSchema {
  $schema?: string;
  label: string;
  inputSchema?: {
    [k: string]: unknown;
  };
  outputSchema?: {
    [k: string]: unknown;
  };
  start: string;
  tasks: {
    [k: string]: ConnectorTask;
  };
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^(.)+$".
 */
export interface ConnectorTask {
  label: string;
  type: string;
  parameters: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^(.)+$".
     */
    [k: string]: unknown;
  };
  next?: string;
}
