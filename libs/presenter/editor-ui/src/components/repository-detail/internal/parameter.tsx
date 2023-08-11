import { Box } from '@mantine/core';
import {
  AtomNameInput,
  ConnectorNameInput,
} from '@shukun/presenter/editor-inputs';
import { RepositorySchema } from '@shukun/schema';

export type ParameterProps = {
  value: unknown;
  onChange: (newValue: unknown) => void;
  parameter: RepositorySchema['parameters'][number];
};

export const Parameter = ({ value, onChange, parameter }: ParameterProps) => {
  const { type } = parameter;

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
      />
    );
  }

  return <Box>未找到该数据仓库的定义</Box>;
};
