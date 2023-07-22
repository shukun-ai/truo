import { ActionIcon, Box, ColorInput, TextInput } from '@mantine/core';
import { MetadataOptions } from '@shukun/schema';

import { getUniqueLabel } from '@shukun/util-functions';

import { IconGripVertical, IconTrash } from '@tabler/icons-react';

import { ArrayInputs } from '../../../../../components/array-inputs/array-inputs';

export type ElectronSelectInputsProps = {
  value: MetadataOptions;
  onChange: (newValue: MetadataOptions) => void;
};

export const ElectronSelectInputs = ({
  value,
  onChange,
}: ElectronSelectInputsProps) => {
  return (
    <ArrayInputs<MetadataOptions[number]>
      value={value}
      onChange={(value) => onChange(value)}
      onCreate={() => {
        const key = getUniqueLabel(
          'untitle',
          value.map((item) => item.key),
        );
        return {
          key: key,
          label: key,
        };
      }}
      renderItem={(itemValue, itemChange, itemRemove, { drag }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ActionIcon sx={{ cursor: 'move' }} ref={drag} mt={22}>
            <IconGripVertical size="1rem" />
          </ActionIcon>
          <TextInput
            sx={{ flex: 1 }}
            label="唯一值"
            value={itemValue.key}
            onChange={(event) =>
              itemChange({ ...itemValue, key: event.target.value })
            }
          />
          <TextInput
            sx={{ flex: 1 }}
            label="显示名"
            value={itemValue.label}
            onChange={(event) =>
              itemChange({ ...itemValue, label: event.target.value })
            }
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
          />
          <ActionIcon
            mt={22}
            onClick={() => {
              itemRemove();
            }}
          >
            <IconTrash size="1rem" />
          </ActionIcon>
        </Box>
      )}
    />
  );
};
