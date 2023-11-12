import { Group, Select, Switch, TextInput } from '@mantine/core';
import { ViewFieldType, ViewTableField } from '@shukun/schema';

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
        data={[
          { label: '文字', value: 'Text' },
          { label: '标识符', value: 'NameText' },
          { label: '段落', value: 'LargeText' },
          { label: '单选', value: 'SingleSelect' },
          { label: '多选', value: 'MultiSelect' },
          { label: '布尔', value: 'Boolean' },
          { label: '日期时间', value: 'DateTime' },
          { label: '整数', value: 'Integer' },
          { label: '浮点数', value: 'Float' },
          { label: '货币', value: 'Currency' },
          { label: '密码', value: 'Password' },
          { label: '多对多', value: 'ManyToMany' },
          { label: '多对一', value: 'ManyToOne' },
          { label: '创建人', value: 'Owner' },
          { label: '附件或图片', value: 'Attachment' },
          { label: 'JSON', value: 'Mixed' },
          { label: '角色', value: 'Role' },
          { label: '一对多', value: 'OneToMany' },
          { label: '链接文本', value: 'LinkText' },
        ]}
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
