import { ActionIcon, ColorInput, Group, TextInput } from '@mantine/core';
import { ArrayInputs } from '@shukun/component';
import { MetadataOptions } from '@shukun/schema';

import {
  append,
  getUniqueLabel,
  move,
  remove,
  update,
} from '@shukun/util-functions';

import { IconGripVertical, IconTrash } from '@tabler/icons-react';

export type ElectronSelectInputsProps = {
  value: MetadataOptions;
  onChange: (newValue: MetadataOptions) => void;
  disabled?: boolean;
};

export const ElectronSelectInputs = ({
  value,
  onChange,
  disabled,
}: ElectronSelectInputsProps) => {
  return (
    <ArrayInputs<MetadataOptions[number]>
      disabled={disabled}
      value={value}
      onUpdate={(index, newValue) => {
        onChange(update(value, index, newValue));
      }}
      onCreate={() => {
        const key = getUniqueLabel(
          'untitle',
          value.map((item) => item.key),
        );
        onChange(
          append(value, {
            key: key,
            label: key,
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
          {!disabled && (
            <ActionIcon sx={{ cursor: 'move' }} ref={drag} mt={22}>
              <IconGripVertical size="1rem" />
            </ActionIcon>
          )}

          <TextInput
            sx={{ flex: 1 }}
            label="唯一值"
            value={itemValue.key}
            onChange={(event) =>
              itemChange({ ...itemValue, key: event.target.value })
            }
            disabled={disabled}
          />
          <TextInput
            sx={{ flex: 1 }}
            label="显示名"
            value={itemValue.label}
            onChange={(event) =>
              itemChange({ ...itemValue, label: event.target.value })
            }
            disabled={disabled}
          />
          <ColorInput
            sx={{ flex: 1 }}
            label="颜色"
            value={itemValue.color}
            onChange={(value) =>
              itemChange({
                ...itemValue,
                color: value || undefined,
              })
            }
            disabled={disabled}
          />
          <ActionIcon
            mt={22}
            onClick={() => {
              itemRemove();
            }}
            disabled={disabled}
          >
            <IconTrash size="1rem" />
          </ActionIcon>
        </Group>
      )}
    />
  );
};
