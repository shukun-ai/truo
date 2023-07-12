import { Box } from '@mantine/core';

import { UseFormReturnType } from '@mantine/form';

import { ConnectorEntity } from '../../../../../../repositories/connector/connector-ref';

import { Tasks } from './tasks';

export type SchemaProps = {
  form: UseFormReturnType<
    ConnectorEntity,
    (values: ConnectorEntity) => ConnectorEntity
  >;
};

export const Schema = ({ form }: SchemaProps) => {
  return (
    <Box>
      <Tasks {...form.getInputProps('tasks')} />
    </Box>
  );
};
