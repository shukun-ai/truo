import { Box, Title } from '@mantine/core';

import { ViewEntity } from '../../../editor-context';

export type SchemaProps = {
  value: ViewEntity;
  onChange: (newValue: ViewEntity) => void;
};

export const Schema = ({ value, onChange }: SchemaProps) => {
  return (
    <Box>
      <Title order={5} mb="md">
        定义变量类型表（Schema）
      </Title>
    </Box>
  );
};
