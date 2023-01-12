export interface SchemaValidatorInterface {
  compile(jsonSchema: unknown): void;
  validate(input: unknown): void;
}
