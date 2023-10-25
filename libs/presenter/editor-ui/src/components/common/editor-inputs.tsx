import { Box, Code, Text } from '@mantine/core';
import {
  AtomNameInput,
  BooleanInput,
  BoxModelInput,
  ConnectorNameInput,
  DataBindingInput,
  EnumInput,
  MultipleState,
  NumberInput,
  StringInput,
  TaskNameInput,
} from '@shukun/presenter/editor-inputs';

import { useMemo } from 'react';

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
  const { state, devtool } = useEditorContext();
  const { metadatas, connectors } = state;
  const { logs } = devtool;

  const commonInputProps = {
    label,
    secondaryLabel,
    description,
    disabledJsMode,
    logs,
    widgetId: undefined,
  };

  const atomOptions = useMemo<{ label: string; value: string }[]>(() => {
    return Object.entries(metadatas).map(([atomName, atom]) => ({
      label: `${atom.label} (${atomName})`,
      value: atomName,
    }));
  }, [metadatas]);

  const connectorOptions = useMemo<{ label: string; value: string }[]>(() => {
    return Object.entries(connectors).map(([connectorName, connector]) => ({
      label: `${connector.label} (${connectorName})`,
      value: connectorName,
    }));
  }, [connectors]);

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
    type === 'multipleState' &&
    (Array.isArray(value) || value === undefined)
  ) {
    return (
      <MultipleState value={value} onChange={onChange} {...commonInputProps} />
    );
  }

  if (
    type === 'connectorName' &&
    (typeof value === 'string' || value === undefined)
  ) {
    return (
      <ConnectorNameInput
        value={value}
        onChange={(newValue) => onChange(newValue)}
        connectorOptions={connectorOptions}
        {...commonInputProps}
      />
    );
  }

  if (
    type === 'atomName' &&
    (typeof value === 'string' || value === undefined)
  ) {
    return (
      <AtomNameInput
        value={value}
        onChange={(newValue) => onChange(newValue)}
        atomOptions={atomOptions}
        {...commonInputProps}
      />
    );
  }

  if (
    type === 'taskName' &&
    (typeof value === 'string' || value === undefined)
  ) {
    return (
      <TaskNameInput
        value={value}
        onChange={(newValue) => onChange(newValue)}
        {...commonInputProps}
      />
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
