import { Box, Text } from '@mantine/core';

import { UseFormReturnType } from '@mantine/form';

import { useObservableState } from 'observable-hooks';

import { useMemo } from 'react';

import { useEditorContext } from '../../../editor-context';

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
  const app = useAppContext();
  const { disabledSystem } = useEditorContext();

  const allMetadatas = useObservableState(
    app.repositories.metadataRepository.all$,
    [],
  );

  const disabled = useMemo(() => {
    return form.values.metadataName.startsWith('system__')
      ? true
      : disabledSystem;
  }, [disabledSystem, form.values.metadataName]);

  return (
    <Box>
      <SchemaProvider metadatas={allMetadatas}>
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
