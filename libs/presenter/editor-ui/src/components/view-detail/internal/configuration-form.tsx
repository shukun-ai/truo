import { Box } from '@mantine/core';
import { ViewSchema } from '@shukun/schema';

import { TableFieldsForm } from './table-fields-form';

export type ConfigurationsFormProps = {
  value: NonNullable<ViewSchema['configurations']>;
  onChange: (newValue: ViewSchema['configurations']) => void;
};

export const ConfigurationsForm = ({
  value,
  onChange,
}: ConfigurationsFormProps) => {
  return (
    <Box>
      <TableFieldsForm
        value={value.tableFields ?? []}
        onChange={(newValue) => {
          onChange({
            ...value,
            tableFields: newValue,
          });
        }}
      />
    </Box>
  );
};
