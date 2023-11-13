import { ActionIcon, Group } from '@mantine/core';
import { ArrayInputs, Icon } from '@shukun/component';
import { ViewFieldType, ViewTableField } from '@shukun/schema';
import {
  append,
  getUniqueLabel,
  move,
  remove,
  update,
} from '@shukun/util-functions';

import { TableFieldForm } from './table-field-form';

export type TableFieldsFormProps = {
  value: ViewTableField[];
  onChange: (newValue: ViewTableField[]) => void;
};

export const TableFieldsForm = ({ value, onChange }: TableFieldsFormProps) => {
  return (
    <ArrayInputs
      value={value}
      onUpdate={(index, newValue) => {
        onChange(update(value, index, newValue));
      }}
      onCreate={() => {
        const key = getUniqueLabel(
          'untitle',
          value.map((item) => item.name),
        );
        onChange(
          append(value, {
            name: key,
            label: '',
            type: ViewFieldType.Text,
            electronName: '',
          }),
        );
      }}
      onMove={(sourceIndex, targetIndex) => {
        onChange(move(value, sourceIndex, targetIndex));
      }}
      onRemove={(index) => {
        onChange(remove(value, index));
      }}
      renderItem={(itemValue, itemChange, itemRemove, { index }) => (
        <Group>
          <ArrayInputs.ArrowHandler
            index={index}
            onMove={(sourceIndex, targetIndex) =>
              onChange(move(value, sourceIndex, targetIndex))
            }
          />
          <TableFieldForm
            value={itemValue}
            onChange={(newValue) => {
              itemChange(newValue);
            }}
          />
          <ActionIcon
            mt={22}
            onClick={() => {
              itemRemove();
            }}
          >
            <Icon type="trash" size="1rem" />
          </ActionIcon>
        </Group>
      )}
    />
  );
};
