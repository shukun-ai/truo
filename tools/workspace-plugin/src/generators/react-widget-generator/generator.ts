import { WidgetSchema } from '@shukun/schema';
import { toPascalCase } from 'js-convert-case';

export const generatorTypes = (
  widgetName: string,
  definition: WidgetSchema,
) => {
  return `
      export type ${getTypeName(widgetName)} = {
        ${getProps(definition)}
      };
    `;
};

const getTypeName = (widgetName: string): string => {
  return `${convertName(widgetName)}WidgetProps`;
};

const convertName = (text: string): string => {
  return toPascalCase(text);
};

const getProps = (definition: WidgetSchema): string => {
  return [...getCommonProps(definition), ...getChildrenProps(definition)].join(
    '\r',
  );
};

const getCommonProps = (definition: WidgetSchema): string[] => {
  return Object.entries(definition.properties).reduce(getProp, []);
};

const getProp = (
  total: string[],
  [name, prop]: [string, WidgetSchema['properties'][number]],
): string[] => {
  return [...total, `${name}?:${getPropertyOrEvent(prop)};`];
};

const getPropertyOrEvent = (
  prop: WidgetSchema['properties'][number],
): string => {
  if (prop.isEvent) {
    return `(payload: ${getType(prop)}) => Promise<void>`;
  } else {
    return getType(prop);
  }
};

const getType = (prop: WidgetSchema['properties'][number]): string => {
  switch (prop.type) {
    case 'string':
      return 'string';
    case 'integer':
      return 'number';
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'enum':
      return (prop.enums ?? []).map((item) => `'${item}'`).join('|');
    case 'stringArray':
      return 'string[]';
    case 'optionArray':
      return '{value: string, label: string}[]';
    case 'unknownObject':
      return 'Record<string, unknown>';
    case 'unknownArray':
      return 'unknown[]';
    case 'breakpoints':
      return 'breakpoints';
    case 'attachments':
      return 'attachments';
    case 'dataBinding':
      return 'unknown';
    case 'boxModel':
      return '{ pt?: string; pr?: string; pb?: string; pl?: string; mt?: string; mr?: string; mb?: string; ml?: string; w?: string; h?: string; }';
    case 'void':
      return 'undefined';
    case 'multipleState':
      return 'string[][]';
  }
};

const getChildrenProps = (definition: WidgetSchema): string[] => {
  if (definition.allowedChildTags && definition.allowedChildTags.length > 0) {
    return [`children?: JSX.Element[];`];
  } else {
    return [];
  }
};
