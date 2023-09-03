import { Box } from '@mantine/core';
import {
  AtomNameInput,
  ConnectorNameInput,
  JsonInput,
} from '@shukun/presenter/editor-inputs';
import { RepositorySchema } from '@shukun/schema';

export type ParameterProps = {
  value: unknown;
  onChange: (newValue: unknown) => void;
  parameter: RepositorySchema['parameters'][number];
};

export const Parameter = ({ value, onChange, parameter }: ParameterProps) => {
  const { type } = parameter;

  const commonInputProps = {
    label: parameter.label,
    secondaryLabel: parameter.type,
    description: parameter.description,
    required: parameter.required,
  };

  if (
    type === 'connectorName' &&
    (typeof value === 'string' || value === undefined)
  ) {
    return (
      <ConnectorNameInput
        value={value}
        onChange={(newValue) => onChange(newValue)}
        connectorOptions={[
          {
            label: 'nihao',
            value: 'nihao',
          },
        ]}
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
        atomOptions={[
          {
            label: 'airports',
            value: 'airports',
          },
        ]}
        {...commonInputProps}
      />
    );
  }

  if (type === 'json' && (typeof value === 'string' || value === undefined)) {
    return (
      <JsonInput
        value={value}
        onChange={(newValue) => onChange(newValue)}
        {...commonInputProps}
      />
    );
  }

  return <Box>未找到该数据仓库的定义</Box>;
};
