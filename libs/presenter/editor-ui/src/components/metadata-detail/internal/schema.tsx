import { Box, Text } from '@mantine/core';

import { UseFormReturnType } from '@mantine/form';

import { useMemo } from 'react';

import { MetadataEntity, useEditorContext } from '../../../editor-context';

import { Basic } from './basic';
import { Electrons } from './electrons';
import { SchemaProvider } from './schema-context';

export type SchemaProps = {
  form: UseFormReturnType<
    MetadataEntity,
    (values: MetadataEntity) => MetadataEntity
  >;
};

export const Schema = ({ form }: SchemaProps) => {
  const { state } = useEditorContext();
  const { metadatas } = state;
  const { disabledSystem } = useEditorContext();

  const disabled = useMemo(() => {
    return form.values.id.startsWith('system__') ? true : disabledSystem;
  }, [disabledSystem, form.values.id]);

  return (
    <Box>
      <SchemaProvider metadatas={metadatas}>
        <Text fz="md" fw="bold">
          表基础设置
        </Text>
        <Basic form={form} disabled={disabled} />
        <Text fz="md" fw="bold">
          字段列表
        </Text>
        <Electrons {...form.getInputProps('electrons')} disabled={disabled} />
      </SchemaProvider>
    </Box>
  );
};
