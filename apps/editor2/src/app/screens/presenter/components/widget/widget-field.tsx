import { Box } from '@mantine/core';
import { WidgetProperty } from '@shukun/schema';

import { WidgetBooleanInput } from './widget-boolean-input';
import { WidgetEnumInput } from './widget-enum-input';
import { WidgetNumberInput } from './widget-number-input';
import { WidgetObjectInput } from './widget-object-input';
import { WidgetStringInput } from './widget-string-input';

export type WidgetFieldProps = {
  propertyId: string;
  property: WidgetProperty;
};

export const WidgetField = ({ propertyId, property }: WidgetFieldProps) => {
  const schema = property.schema;

  if (typeof schema !== 'object') {
    return <Box>组件定义文件格式不正确</Box>;
  }

  if (schema.type === 'string') {
    return <WidgetStringInput propertyId={propertyId} property={property} />;
  }

  if (schema.type === 'integer') {
    return (
      <WidgetNumberInput
        propertyId={propertyId}
        property={property}
        isInteger
      />
    );
  }

  if (schema.type === 'number') {
    return <WidgetNumberInput propertyId={propertyId} property={property} />;
  }

  if (schema.type === 'boolean') {
    return <WidgetBooleanInput propertyId={propertyId} property={property} />;
  }

  if (schema.type === 'array') {
    return <WidgetObjectInput propertyId={propertyId} property={property} />;
  }

  if (schema.type === 'object') {
    return <WidgetObjectInput propertyId={propertyId} property={property} />;
  }

  if (schema.type === 'null') {
    return <Box>null</Box>;
  }

  if (schema.enum) {
    return <WidgetEnumInput propertyId={propertyId} property={property} />;
  }

  return <Box>未配置组件</Box>;
};
