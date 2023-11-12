import { Box } from '@mantine/core';

import { ViewEntity } from '../../../editor-context';

import { ConfigurationsForm } from './configuration-form';

export type SchemaProps = {
  value: ViewEntity;
  onChange: (newValue: ViewEntity) => void;
};

export const Schema = ({ value, onChange }: SchemaProps) => {
  return (
    <Box>
      <ConfigurationsForm
        value={value.configurations ?? {}}
        onChange={(newValue) => {
          onChange({
            ...value,
            configurations: newValue,
          });
        }}
      />
    </Box>
  );
};
