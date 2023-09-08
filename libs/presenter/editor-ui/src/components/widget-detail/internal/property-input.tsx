import { Box, Code, Text } from '@mantine/core';
import {
  BooleanInput,
  BoxModelInput,
  DataBindingInput,
  EnumInput,
  MultipleState,
  NumberInput,
  StringInput,
} from '@shukun/presenter/editor-inputs';
import { WidgetProperty } from '@shukun/schema';

import { useEditorContext } from '../../../editor-context';

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
  const { devtool } = useEditorContext();
  const { logs } = devtool;

  const { type, enums, disabledJsMode, description } = widgetProperty;

  const commonInputProps = {
    label: widgetProperty.label,
    secondaryLabel: widgetPropertyId,
    description,
    disabledJsMode,
    logs,
  };

  if (type === 'enum' && (typeof value === 'string' || value === undefined)) {
    return (
      <EnumInput
        value={value}
        onChange={onChange}
        enums={enums ?? []}
        {...commonInputProps}
      />
    );
  }

  if (type === 'string' && (typeof value === 'string' || value === undefined)) {
    return (
      <StringInput value={value} onChange={onChange} {...commonInputProps} />
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
        value={value}
        onChange={onChange}
        isInteger
        {...commonInputProps}
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
      <NumberInput value={value} onChange={onChange} {...commonInputProps} />
    );
  }

  if (
    type === 'boolean' &&
    (typeof value === 'boolean' ||
      typeof value === 'string' ||
      value === undefined)
  ) {
    return (
      <BooleanInput value={value} onChange={onChange} {...commonInputProps} />
    );
  }

  if (
    type === 'dataBinding' &&
    (typeof value === 'string' || value === undefined)
  ) {
    return (
      <DataBindingInput
        value={value}
        onChange={onChange}
        {...commonInputProps}
      />
    );
  }

  if (type === 'boxModel') {
    return (
      <BoxModelInput
        value={value as any}
        onChange={onChange}
        {...commonInputProps}
      />
    );
  }

  if (
    (type === 'multipleState' && Array.isArray(value)) ||
    value === undefined
  ) {
    return (
      <MultipleState value={value} onChange={onChange} {...commonInputProps} />
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
