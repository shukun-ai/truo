/* eslint-disable */
/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Describe Source Schema
 */
export interface SourceSchema {
  $schema?: string;
  connections: {
    [k: string]: SourceConnection;
  };
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^(\w)+$".
 */
export interface SourceConnection {
  /**
   * The data will be saved into system-level Database (MongoDB). The rule like: protocol://username:password@host:port/database?options...
   */
  connection: string;
  metadata: string[];
  tablePrefix?: string;
  description?: string;
}
