import { Box, Text } from '@mantine/core';

import { UseFormReturnType } from '@mantine/form';

import { EnvironmentEntity } from '../../../../../../repositories/environment/environment-ref';

import { Basic } from './basic';

export type SchemaProps = {
  form: UseFormReturnType<
    EnvironmentEntity,
    (values: EnvironmentEntity) => EnvironmentEntity
  >;
};

export const Schema = ({ form }: SchemaProps) => {
  return (
    <Box>
      <Text fz="md" fw="bold">
        基础设置
      </Text>
      <Basic form={form} />
    </Box>
  );
};
