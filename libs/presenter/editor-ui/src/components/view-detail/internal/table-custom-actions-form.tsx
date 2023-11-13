import { ActionIcon, Group } from '@mantine/core';
import { ArrayInputs, Icon } from '@shukun/component';
import { ViewCustomAction, ViewCustomActionType } from '@shukun/schema';
import {
  append,
  getUniqueLabel,
  move,
  remove,
  update,
} from '@shukun/util-functions';

import { TableCustomActionForm } from './table-custom-action-form';

export type TableCustomActionsFormProps = {
  value: ViewCustomAction[];
  onChange: (newValue: ViewCustomAction[]) => void;
};

export const TableCustomActionsForm = ({
  value,
  onChange,
}: TableCustomActionsFormProps) => {
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
            type: ViewCustomActionType.Column,
          }),
        );
      }}
      onMove={(sourceIndex, targetIndex) => {
        onChange(move(value, sourceIndex, targetIndex));
      }}
      onRemove={(index) => {
        onChange(remove(value, index));
      }}
      renderItem={(itemValue, itemChange, itemRemove, { drag }) => (
        <Group>
          <TableCustomActionForm
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
