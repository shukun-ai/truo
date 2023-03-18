import { ValuesType } from 'utility-types';
import { WidgetSchema } from './widget';

export class GenerateTypes {
  public convert(definition: WidgetSchema): string {
    return `
      import { ReactNode } from 'React';

      export type ${this.getDefinitionName(definition.tag)}DefinitionProps = {
        ${this.getProperties(definition.properties)}
      }
    `;
  }

  private getDefinitionName(tag: string): string {
    const name =
      tag.substring(0, 1).toUpperCase() + tag.substring(1, tag.length);
    return name;
  }

  private getProperties(properties: WidgetSchema['properties']): string {
    let text: string = '';
    for (const [propertyName, property] of Object.entries(properties)) {
      text += this.getProperty(propertyName, property);
    }
    text += 'children?: ReactNode;';
    return text;
  }

  private getProperty(
    propertyName: string,
    property: ValuesType<WidgetSchema['properties']>,
  ) {
    return `${this.getName(propertyName, property)} ${this.getType(property)};`;
  }

  private getName(
    propertyName: string,
    property: ValuesType<WidgetSchema['properties']>,
  ) {
    if (property.defaultValue || property.type === 'callback') {
      return `${propertyName}:`;
    } else {
      return `${propertyName}?:`;
    }
  }

  private getType(property: ValuesType<WidgetSchema['properties']>) {
    switch (property.type) {
      case 'string':
      case 'number':
      case 'boolean':
        return property.type;
      case 'array':
        return 'unknown[]';
      case 'object':
        return 'Record<string, unknown>';
      case 'enum':
        return this.getEnumOptions(property.enumOptions);
      case 'callback':
        return '(payload: unknown) => void';
    }
  }

  private getEnumOptions(
    enumOptions: ValuesType<WidgetSchema['properties']>['enumOptions'],
  ): string {
    if (!enumOptions) {
      return 'string';
    }
    return enumOptions.map((item) => `'${item.value}'`).join('|');
  }
}
