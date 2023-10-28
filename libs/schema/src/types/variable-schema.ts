/**
 * @remark The VariableSchema is fork from JSON Schema 7 and simplify the properties
 */
export interface VariableSchema {
  $comment?: string | undefined;

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1
   */
  type?: VariableSchemaTypeName | undefined;
  enum?: VariableSchemaType[] | undefined;

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.4
   */
  items?: VariableSchemaDefinition | undefined;

  required?: string[] | undefined;
  properties?:
    | {
        [key: string]: VariableSchemaDefinition;
      }
    | undefined;

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-7
   */
  format?: string | undefined;

  description?: string | undefined;
  default?: VariableSchemaType | undefined;
}

// Workaround for infinite type recursion
// https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128553540
export type VariableSchemaArray = Array<VariableSchemaType>;
/**
 * JSON Schema v7
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01
 */
export type VariableSchemaDefinition = VariableSchema;
export type VariableSchemaTypeName =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'object'
  | 'array'
  | 'null';
export type VariableSchemaType =
  | string
  | number
  | boolean
  | VariableSchemaObject
  | VariableSchemaArray
  | null;
// Workaround for infinite type recursion
export interface VariableSchemaObject {
  [key: string]: VariableSchemaType;
}
