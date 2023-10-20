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

import { useEditorContext } from '../../editor-context';

export type EditorInputsProps = {
  value: unknown;
  onChange: (newValue: unknown) => void;
  label: string;
  secondaryLabel: string;
  type:
    | 'string'
    | 'integer'
    | 'number'
    | 'boolean'
    | 'void'
    | 'enum'
    | 'stringArray'
    | 'optionArray'
    | 'unknownObject'
    | 'unknownArray'
    | 'dataBinding'
    | 'breakpoints'
    | 'attachments'
    | 'boxModel'
    | 'multipleState'
    | 'taskName'
    | 'atomName'
    | 'sourceQuery'
    | 'connectorName'
    | 'variableName'
    | 'parallelBranches';
  required?: boolean;
  enums?: string[];
  description?: string;
  disabledJsMode?: boolean;
};

export const EditorInputs = ({
  value,
  onChange,
  label,
  secondaryLabel,
  type,
  enums,
  disabledJsMode,
  description,
}: EditorInputsProps) => {
  const { devtool } = useEditorContext();
  const { logs } = devtool;

  const commonInputProps = {
    label,
    secondaryLabel,
    description,
    disabledJsMode,
    logs,
    widgetId: undefined,
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
      <Text fw="bold">缺少输入框配置字段</Text>
      <Text c="gray" size="xs" mb={6}>
        当前定义表
      </Text>
      <Text c="gray" size="xs" mb={6}>
        缺少类型：{type}
      </Text>
      <Code block mb={6}>
        {JSON.stringify(value)}
      </Code>
    </Box>
  );
};
