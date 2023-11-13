import { Group, TextInput } from '@mantine/core';
import { ViewCustomAction } from '@shukun/schema';

import { Bordered } from './bordered';

export type TableCustomActionFormProps = {
  value: ViewCustomAction;
  onChange: (newValue: ViewCustomAction) => void;
};

export const TableCustomActionForm = ({
  value,
  onChange,
}: TableCustomActionFormProps) => {
  return (
    <Bordered>
      <Group>
        <TextInput
          label="标识符"
          value={value.name}
          onChange={(event) => {
            onChange({
              ...value,
              name: event.target.value,
            });
          }}
        />
        <TextInput
          label="显示名"
          value={value.label}
          onChange={(event) => {
            onChange({
              ...value,
              label: event.target.value,
            });
          }}
        />
        <TextInput
          label="值"
          value={value.value}
          onChange={(event) => {
            onChange({
              ...value,
              value: event.target.value,
            });
          }}
        />
      </Group>
    </Bordered>
  );
};
