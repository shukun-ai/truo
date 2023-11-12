import { Group, Select, Switch, TextInput } from '@mantine/core';
import { ViewFieldType, ViewTableField } from '@shukun/schema';

import { fieldTypeOptions } from './view-field-type-options';

export type TableFieldFormProps = {
  value: ViewTableField;
  onChange: (newValue: ViewTableField) => void;
};

export const TableFieldForm = ({ value, onChange }: TableFieldFormProps) => {
  return (
    <Group>
      <TextInput
        label="列标识符"
        value={value.name}
        onChange={(event) => {
          onChange({
            ...value,
            name: event.target.value,
          });
        }}
      />
      <TextInput
        label="列显示名"
        value={value.label}
        onChange={(event) => {
          onChange({
            ...value,
            label: event.target.value,
          });
        }}
      />
      <Select
        label="列类型"
        data={fieldTypeOptions}
        value={value.type}
        onChange={(newValue) => {
          onChange({
            ...value,
            type: newValue as ViewFieldType,
          });
        }}
      />
      <TextInput
        label="元数据字段"
        value={value.electronName}
        onChange={(event) => {
          onChange({
            ...value,
            electronName: event.target.value,
          });
        }}
      />
      <Switch
        label="隐藏列搜索"
        checked={value.filterHidden}
        onChange={(event) => {
          onChange({
            ...value,
            filterHidden: event.target.checked,
          });
        }}
      />
    </Group>
  );
};
