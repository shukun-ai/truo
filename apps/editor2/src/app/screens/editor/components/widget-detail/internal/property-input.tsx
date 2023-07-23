import { Box, Code, Text } from '@mantine/core';
import { WidgetProperty } from '@shukun/schema';

import { WidgetBooleanInput } from '../../../../../components/widget-editor/widget-boolean-input';
import { WidgetEnumInput } from '../../../../../components/widget-editor/widget-enum-input';
import { WidgetNumberInput } from '../../../../../components/widget-editor/widget-number-input';
import { WidgetObjectInput } from '../../../../../components/widget-editor/widget-object-input';
import { WidgetStringInput } from '../../../../../components/widget-editor/widget-string-input';

export type PropertyInputProps = {
  widgetProperty: WidgetProperty;
  value: unknown;
  onChange: (newValue: unknown) => void;
};

export const PropertyInput = ({
  widgetProperty,
  value,
  onChange,
}: PropertyInputProps) => {
  const { schema } = widgetProperty;

  if (typeof schema !== 'object') {
    return <Box>组件定义文件格式不正确</Box>;
  }

  if (schema.enum && (typeof value === 'string' || value === undefined)) {
    return (
      <WidgetEnumInput
        value={value}
        onChange={onChange}
        widgetProperty={widgetProperty}
      />
    );
  }

  if (
    schema.type === 'string' &&
    (typeof value === 'string' || value === undefined)
  ) {
    return <WidgetStringInput value={value} onChange={onChange} />;
  }

  if (
    schema.type === 'integer' &&
    (typeof value === 'number' || value === undefined)
  ) {
    return <WidgetNumberInput value={value} onChange={onChange} isInteger />;
  }

  if (
    schema.type === 'number' &&
    (typeof value === 'number' || value === undefined)
  ) {
    return <WidgetNumberInput value={value} onChange={onChange} />;
  }

  if (
    schema.type === 'boolean' &&
    (typeof value === 'boolean' || value === undefined)
  ) {
    return <WidgetBooleanInput value={value} onChange={onChange} />;
  }

  if (
    schema.type === 'array' &&
    (Array.isArray(value) || value === undefined)
  ) {
    return <WidgetObjectInput value={value} onChange={onChange} />;
  }

  if (
    schema.type === 'object' &&
    value !== null &&
    (typeof value === 'object' || value === undefined)
  ) {
    return <WidgetObjectInput value={value} onChange={onChange} />;
  }

  return (
    <Box mb={12} sx={{ border: 'solid 1px #eee', padding: 12 }}>
      <Text fw="bold">组件字段定义表配置不正确，请联系管理员</Text>
      <Text c="gray" size="xs" mb={6}>
        组件字段定义表
      </Text>
      <Code block mb={6}>
        {JSON.stringify(widgetProperty)}
      </Code>
      <Text c="gray" size="xs" mb={6}>
        组件值
      </Text>
      <Code block mb={6}>
        {JSON.stringify(value)}
      </Code>
    </Box>
  );
};
