import Ajv from 'ajv';
import { toPascalCase } from 'js-convert-case';
import { compile, JSONSchema } from 'json-schema-to-typescript';
import { ValuesType } from 'utility-types';

export interface WidgetSchema {
  $schema?: string;
  tag: string;
  experimental?: boolean;
  properties: {
    [k: string]: {
      label: string;
      schema: JSONSchema;
      isEvent?: boolean;
      defaultValue?: unknown;
    };
  };
}

export class DefinitionGenerator {
  private RESERVED_KEYWORDS = [
    'item',
    'index',
    'key',
    'children',
    'parent',
    'payload',
    'event',
    'property',
    'events',
    'properties',
  ];

  constructor(private readonly ajv: Ajv) {}

  public async generate(definition: WidgetSchema): Promise<string> {
    this.validateDefaultValues(definition);

    return `
      export type ${this.getDefinitionName(definition.tag)}DefinitionProps = {
        ${this.getProperties(
          definition.properties,
          this.getDefinitionName(definition.tag),
        )}
      }

      ${await this.getSchemaTypes(definition)}
    `;
  }

  private getDefinitionName(tag: string): string {
    return toPascalCase(tag);
  }

  private getProperties(
    properties: WidgetSchema['properties'],
    definitionId: string,
  ): string {
    let text = '';
    let index = 0;
    for (const [propertyId, property] of Object.entries(properties)) {
      text += index === 0 ? '' : '\n';
      text += `${this.getProperty(property, propertyId, definitionId)}`;
      index++;
    }
    return text;
  }

  private getProperty(
    property: ValuesType<WidgetSchema['properties']>,
    propertyId: string,
    definitionId: string,
  ) {
    if (this.RESERVED_KEYWORDS.includes(propertyId)) {
      throw new Error(
        `You have used reserved keywords: ${this.RESERVED_KEYWORDS.join(', ')}`,
      );
    }
    return `${this.getName(propertyId, property)} ${this.getType(
      property,
      propertyId,
      definitionId,
    )};`;
  }

  private getName(
    propertyName: string,
    property: ValuesType<WidgetSchema['properties']>,
  ) {
    if (property.defaultValue !== undefined && !property.isEvent) {
      return `${propertyName}:`;
    } else {
      return `${propertyName}?:`;
    }
  }

  private getType(
    property: ValuesType<WidgetSchema['properties']>,
    propertyId: string,
    definitionId: string,
  ) {
    const typeName = `${toPascalCase(definitionId)}Definition${toPascalCase(
      propertyId,
    )}`;
    return property.isEvent ? `(payload: ${typeName}) => void` : typeName;
  }

  private async getSchemaTypes(definition: WidgetSchema) {
    let types = '';
    for (const [propertyId, property] of Object.entries(
      definition.properties,
    )) {
      const ts = await this.getSchemaType(
        property,
        propertyId,
        this.getDefinitionName(definition.tag),
      );
      types += `${ts}\n`;
    }
    return types;
  }

  private async getSchemaType(
    property: ValuesType<WidgetSchema['properties']>,
    propertyId: string,
    definitionId: string,
  ) {
    const ts = await compile(
      property.schema,
      `${toPascalCase(definitionId)}Definition${toPascalCase(propertyId)}`,
      {
        bannerComment: '',
      },
    );
    return ts;
  }

  private validateDefaultValues(definition: WidgetSchema) {
    for (const property of Object.values(definition.properties)) {
      if (property.defaultValue === undefined) {
        return;
      }

      const validate = this.ajv.compile(property.schema);
      const valid = validate(property.defaultValue);

      if (!valid) {
        const messages = JSON.stringify(validate.errors);
        throw new Error(
          'The defaultValue is not suitable for schema: ' + messages,
        );
      }
    }
  }
}
