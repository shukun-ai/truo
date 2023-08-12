import { Box } from '@mantine/core';

import { UseFormReturnType } from '@mantine/form';

import { ConnectorEntity, useEditorContext } from '../../../editor-context';

import { Basic } from './basic';
import { Tasks } from './tasks';

export type SchemaProps = {
  form: UseFormReturnType<
    ConnectorEntity,
    (values: ConnectorEntity) => ConnectorEntity
  >;
};

export const Schema = ({ form }: SchemaProps) => {
  const { disabledSystem } = useEditorContext();

  return (
    <Box>
      <Basic form={form} disabled={disabledSystem} />
      <Tasks {...form.getInputProps('tasks')} disabled={disabledSystem} />
    </Box>
  );
};
