import { Box, Text } from '@mantine/core';

import { UseFormReturnType } from '@mantine/form';

import { EnvironmentEntity, useEditorContext } from '../../../editor-context';

import { Basic } from './basic';

export type SchemaProps = {
  form: UseFormReturnType<
    EnvironmentEntity,
    (values: EnvironmentEntity) => EnvironmentEntity
  >;
};

export const Schema = ({ form }: SchemaProps) => {
  const { disabledSystem } = useEditorContext();

  return (
    <Box>
      <Text fz="md" fw="bold">
        基础设置
      </Text>
      <Basic form={form} disabled={disabledSystem} />
    </Box>
  );
};
