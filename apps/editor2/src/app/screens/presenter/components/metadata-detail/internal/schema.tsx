import { Box, Text } from '@mantine/core';

import { UseFormReturnType } from '@mantine/form';

import { MetadataEntity } from '../../../../../../repositories/metadata/metadata-ref';

import { Basic } from './basic';
import { Electrons } from './electrons';

export type SchemaProps = {
  form: UseFormReturnType<
    MetadataEntity,
    (values: MetadataEntity) => MetadataEntity
  >;
};

export const Schema = ({ form }: SchemaProps) => {
  return (
    <Box>
      <Text fz="md" fw="bold">
        表基础设置
      </Text>
      <Basic form={form} />
      <Text fz="md" fw="bold">
        字段列表
      </Text>
      <Electrons {...form.getInputProps('electrons')} />
    </Box>
  );
};
