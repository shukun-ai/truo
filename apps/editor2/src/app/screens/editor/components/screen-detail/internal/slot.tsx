import { Box, Card, Checkbox, Select, SelectItem } from '@mantine/core';

import { ReactNode, useEffect } from 'react';

import { autoCreatingValue } from '../../../../../../repositories/presenter/screen-create';

import { SlotStructure } from './available-slots';

export type SlotProps = {
  slot: SlotStructure;
  containerOptions: SelectItem[];
  value: string;
  onChange: (newValue: string | null) => void;
  error: ReactNode;
  isEditMode: boolean;
};

export const Slot = ({
  slot,
  containerOptions,
  value,
  onChange,
  error,
  isEditMode,
}: SlotProps) => {
  useEffect(() => {
    if (slot.enableAutoCreating && !isEditMode && !value) {
      onChange(autoCreatingValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card withBorder mb={12}>
      {slot.enableAutoCreating && !isEditMode && (
        <Box py={12}>
          <Checkbox
            label={`插槽：${slot.name} 跟随页面自动创建`}
            checked={value === autoCreatingValue}
            onChange={(event) => {
              if (event.target.checked) {
                onChange(autoCreatingValue);
              } else {
                onChange(null);
              }
            }}
            description="为了简化页面和插槽容器的创建，主插槽建议勾选“跟随页面自动创建”，自动创建的容器将与页面同名"
          />
        </Box>
      )}
      {value === autoCreatingValue || (
        <Select
          key={slot.name}
          label={`请选择插槽：${slot.name}`}
          data={containerOptions}
          withAsterisk={slot.required}
          clearable
          value={value}
          onChange={onChange}
          error={error}
          mb={8}
        />
      )}
    </Card>
  );
};
