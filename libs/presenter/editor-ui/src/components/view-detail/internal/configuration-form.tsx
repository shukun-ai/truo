import { Box } from '@mantine/core';
import { CollapseSection } from '@shukun/component';
import { ViewSchema } from '@shukun/schema';

import { useState } from 'react';

import { RibbonsForm } from './ribbons-form';
import { TableCustomActionsForm } from './table-custom-actions-form';
import { TableFieldsForm } from './table-fields-form';

export type ConfigurationsFormProps = {
  value: NonNullable<ViewSchema['configurations']>;
  onChange: (newValue: ViewSchema['configurations']) => void;
};

export const ConfigurationsForm = ({
  value,
  onChange,
}: ConfigurationsFormProps) => {
  const [selected, setSelected] = useState<string | undefined>('tableFields');

  return (
    <Box>
      <CollapseSection
        name="tableFields"
        label="表格字段"
        selected={selected}
        onSelect={setSelected}
        mb={8}
      >
        <TableFieldsForm
          value={value.tableFields ?? []}
          onChange={(newValue) => {
            onChange({
              ...value,
              tableFields: newValue,
            });
          }}
        />
      </CollapseSection>
      <CollapseSection
        name="tableRibbons"
        label="表格按钮"
        selected={selected}
        onSelect={setSelected}
        mb={8}
      >
        <RibbonsForm
          value={value.tableRibbons ?? []}
          onChange={(newValue) => {
            onChange({
              ...value,
              tableRibbons: newValue,
            });
          }}
        />
      </CollapseSection>
      <CollapseSection
        name="tableCustomActions"
        label="表格自定义操作"
        selected={selected}
        onSelect={setSelected}
        mb={8}
      >
        <TableCustomActionsForm
          value={value.tableCustomActions ?? []}
          onChange={(newValue) => {
            onChange({
              ...value,
              tableCustomActions: newValue,
            });
          }}
        />
      </CollapseSection>
    </Box>
  );
};
