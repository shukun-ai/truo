/* eslint-disable */
/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Define the UI Element
 */
export interface ElementSchema {
  name: string;
  vendor: string;
  extends?: string;
  description?: string;
  sections: {
    name: string;
    label: string;
    [k: string]: unknown;
  }[];
  input: {
    /**
     * The data described by New JSON Schema is injected into UiElement.
     */
    schema?: {
      [k: string]: unknown;
    };
    type: ['code', 'switch', 'select'];
    name: string;
    label: string;
    configureTip?: string;
    section: string;
    [k: string]: unknown;
  }[];
  output: {
    /**
     * The UiElement emit data described by JSON Schema.
     */
    schema?: {
      [k: string]: unknown;
    };
    type: ['code'];
    name: string;
    label: string;
    configureTip?: string;
    section: string;
    [k: string]: unknown;
  }[];
}
