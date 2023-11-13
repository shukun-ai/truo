import { Box } from '@mantine/core';
import { ViewSchema } from '@shukun/schema';

import { useState } from 'react';

import { CollapseSection } from './collapse-section';
import { RibbonsForm } from './ribbons-form';
import { TableFieldsForm } from './table-fields-form';

export type ConfigurationsFormProps = {
  value: NonNullable<ViewSchema['configurations']>;
  onChange: (newValue: ViewSchema['configurations']) => void;
};

export const ConfigurationsForm = ({
  value,
  onChange,
}: ConfigurationsFormProps) => {
  const [selected, setSelected] = useState<string>();

  return (
    <Box>
      <CollapseSection
        name="tableFields"
        label="列表字段配置"
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
        label="列表按钮配置"
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
    </Box>
  );
};
