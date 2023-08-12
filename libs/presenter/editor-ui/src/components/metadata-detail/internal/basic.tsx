import { Card, TextInput } from '@mantine/core';

import { UseFormReturnType } from '@mantine/form';

import { MetadataEntity } from '../../../editor-context';

export type BasicProps = {
  form: UseFormReturnType<
    MetadataEntity,
    (values: MetadataEntity) => MetadataEntity
  >;
  disabled?: boolean;
};

export const Basic = ({ form, disabled }: BasicProps) => {
  return (
    <Card withBorder mt={12} mb={6}>
      <TextInput
        label="表显示名称"
        {...form.getInputProps('label')}
        disabled={disabled}
      />
      <TextInput
        label="表描述"
        {...form.getInputProps('description')}
        disabled={disabled}
      />
    </Card>
  );
};
