import { omit } from 'lodash';

import { VariableSchema } from '../variable-schema';

export const createProperty = (parent: VariableSchema): VariableSchema => {
  return {
    ...parent,
    properties: {
      ...parent.properties,
      untitle: {},
    },
  };
};

export const removeProperty = (): null => {
  return null;
};

export const updateProperty = (
  parent: VariableSchema,
  newProperty: VariableSchema | null,
  propertyName: string,
): VariableSchema => {
  if (newProperty) {
    return {
      ...parent,
      properties: {
        ...parent.properties,
        [propertyName]: newProperty,
      },
    };
  } else {
    const newProperties = omit(parent.properties, [propertyName]);
    return {
      ...parent,
      properties: newProperties,
    };
  }
};

export const updateArrayItems = (
  parent: VariableSchema,
  newItems: VariableSchema,
): VariableSchema => {
  return {
    ...parent,
    items: newItems,
  };
};

export const updatePropertyName = (
  parent: VariableSchema,
  oldPropertyName: string,
  newPropertyName: string,
): VariableSchema => {
  if (Object.keys(parent.properties ?? {}).includes(newPropertyName)) {
    throw new Error('新属性名重复');
  }

  const newProperties: VariableSchema['properties'] = Object.entries(
    parent.properties ?? {},
  ).reduce((total, [name, value]) => {
    const propertyName = name === oldPropertyName ? newPropertyName : name;
    return {
      ...total,
      [propertyName]: value,
    };
  }, {});

  return {
    ...parent,
    properties: newProperties,
  };
};
