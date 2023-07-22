import { Card, TextInput } from '@mantine/core';

import { UseFormReturnType } from '@mantine/form';

import { MetadataEntity } from '../../../../../../repositories/metadata/metadata-ref';

export type BasicProps = {
  form: UseFormReturnType<
    MetadataEntity,
    (values: MetadataEntity) => MetadataEntity
  >;
};

export const Basic = ({ form }: BasicProps) => {
  return (
    <Card withBorder mt={12} mb={6}>
      <TextInput label="表显示名称" {...form.getInputProps('label')} />
      <TextInput label="表描述" {...form.getInputProps('description')} />
    </Card>
  );
};
