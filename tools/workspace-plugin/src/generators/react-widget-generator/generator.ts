import { WidgetSchema } from '@shukun/schema';

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
  return `${firstUppercase(widgetName)}WidgetProps`;
};

const firstUppercase = (text: string): string => {
  const first = text.substring(0, 1).toUpperCase();
  const other = text.substring(1, text.length);
  return `${first}${other}`;
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
  return [...total, `${name}?:${getType(prop)};`];
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
  }
};

const getChildrenProps = (definition: WidgetSchema): string[] => {
  if (definition.allowedChildTags && definition.allowedChildTags.length > 0) {
    return [`children?: JSX.Element | JSX.Element[];`];
  } else {
    return [];
  }
};
