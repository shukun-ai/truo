import { Box, Text, Title } from '@mantine/core';

import { PresenterRepository, RepositorySchema } from '@shukun/schema';

import { Parameters } from './parameters';

export type SchemaProps = {
  value: PresenterRepository;
  onChange: (newValue: PresenterRepository) => void;
  definition: RepositorySchema;
};

export const Schema = ({ value, onChange, definition }: SchemaProps) => {
  return (
    <Box>
      <Title order={4}>{value.type} 数据仓库</Title>
      <Text>{definition.scope} 作用范围</Text>
      <Parameters
        value={value.parameters}
        onChange={(newValue) => onChange({ ...value, parameters: newValue })}
        definition={definition}
      />
    </Box>
  );
};
