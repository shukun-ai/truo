import { Box } from '@mantine/core';
import { ConnectorNameInput } from '@shukun/presenter/editor-inputs';
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

  return <Box>未找到该数据仓库的定义</Box>;
};
