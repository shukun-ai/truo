import { ValuesType } from 'utility-types';
import { toPascalCase } from 'js-convert-case';
import { compile, JSONSchema } from 'json-schema-to-typescript';

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

  public async generate(definition: WidgetSchema): Promise<string> {
    return `
      export type ${this.getDefinitionName(definition.tag)}DefinitionProps = {
        ${await this.getProperties(
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

  private async getProperties(
    properties: WidgetSchema['properties'],
    definitionId: string,
  ): Promise<string> {
    let text = '';
    let index = 0;
    for (const [propertyId, property] of Object.entries(properties)) {
      text += index === 0 ? '' : '\n';
      text += `${await this.getProperty(property, propertyId, definitionId)}`;
      index++;
    }
    return text;
  }

  private async getProperty(
    property: ValuesType<WidgetSchema['properties']>,
    propertyId: string,
    definitionId: string,
  ) {
    if (this.RESERVED_KEYWORDS.includes(propertyId)) {
      throw new Error(
        `You have used reserved keywords: ${this.RESERVED_KEYWORDS.join(', ')}`,
      );
    }
    return `${this.getName(propertyId, property)} ${await this.getType(
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

  private async getType(
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
}
