import { WidgetSchema } from '@shukun/schema';
import { Class } from 'utility-types';

export const widgetSchema = (
  definition: WidgetSchema,
  options: { lib: null | 'lit' } = { lib: 'lit' },
) => {
  return (target: Class<any>) => {
    Object.defineProperty(target, 'schema', {
      value: definition,
      writable: false,
    });

    if (options.lib === 'lit') {
      Object.defineProperty(target, 'properties', {
        value: prepareLitProperties(definition),
        writable: false,
      });
    }
  };
};

const prepareLitProperties = (definition: WidgetSchema) => {
  const litProperties: Record<string, any> = {};
  for (const [name, rule] of Object.entries(definition.properties)) {
    litProperties[name] = {
      type: prepareType(rule.expectedType),
      attribute: false,
    };
  }
  return litProperties;
};

const prepareType = (
  type: WidgetSchema['properties'][number]['expectedType'],
) => {
  switch (type) {
    case 'string':
      return String;
    case 'number':
      return Number;
    case 'boolean':
      return Boolean;
    case 'mixed':
      return Object;
  }
};
