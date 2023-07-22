import { Box, Text } from '@mantine/core';

import { UseFormReturnType } from '@mantine/form';

import { useObservableState } from 'observable-hooks';

import { MetadataEntity } from '../../../../../../repositories/metadata/metadata-ref';

import { useAppContext } from '../../../../../contexts/app-context';

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

  const allMetadatas = useObservableState(
    app.repositories.metadataRepository.all$,
    [],
  );

  return (
    <Box>
      <SchemaProvider metadatas={allMetadatas}>
        <Text fz="md" fw="bold">
          表基础设置
        </Text>
        <Basic form={form} />
        <Text fz="md" fw="bold">
          字段列表
        </Text>
        <Electrons {...form.getInputProps('electrons')} />
      </SchemaProvider>
    </Box>
  );
};
