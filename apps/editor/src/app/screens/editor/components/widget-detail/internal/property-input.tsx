import { Box, Code, Text } from '@mantine/core';
import {
  BooleanInput,
  DataBindingInput,
  EnumInput,
  NumberInput,
  StringInput,
} from '@shukun/editor/widget-inputs';
import { WidgetProperty } from '@shukun/schema';

export type PropertyInputProps = {
  widgetPropertyId: string;
  widgetProperty: WidgetProperty;
  value: unknown;
  onChange: (newValue: unknown) => void;
};

export const PropertyInput = ({
  widgetPropertyId,
  widgetProperty,
  value,
  onChange,
}: PropertyInputProps) => {
  const { type, enums } = widgetProperty;

  if (type === 'enum' && (typeof value === 'string' || value === undefined)) {
    return (
      <EnumInput
        label={widgetProperty.label}
        secondaryLabel={widgetPropertyId}
        value={value}
        onChange={onChange}
        enums={enums ?? []}
      />
    );
  }

  if (type === 'string' && (typeof value === 'string' || value === undefined)) {
    return (
      <StringInput
        label={widgetProperty.label}
        secondaryLabel={widgetPropertyId}
        value={value}
        onChange={onChange}
      />
    );
  }

  if (
    type === 'integer' &&
    (typeof value === 'number' ||
      typeof value === 'string' ||
      value === undefined)
  ) {
    return (
      <NumberInput
        label={widgetProperty.label}
        secondaryLabel={widgetPropertyId}
        value={value}
        onChange={onChange}
        isInteger
      />
    );
  }

  if (
    type === 'number' &&
    (typeof value === 'number' ||
      typeof value === 'string' ||
      value === undefined)
  ) {
    return (
      <NumberInput
        label={widgetProperty.label}
        secondaryLabel={widgetPropertyId}
        value={value}
        onChange={onChange}
      />
    );
  }

  if (
    type === 'boolean' &&
    (typeof value === 'boolean' ||
      typeof value === 'string' ||
      value === undefined)
  ) {
    return (
      <BooleanInput
        label={widgetProperty.label}
        secondaryLabel={widgetPropertyId}
        value={value}
        onChange={onChange}
      />
    );
  }

  if (
    type === 'dataBinding' &&
    (typeof value === 'string' || value === undefined)
  ) {
    return (
      <DataBindingInput
        label={widgetProperty.label}
        secondaryLabel={widgetPropertyId}
        value={value}
        onChange={onChange}
      />
    );
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
