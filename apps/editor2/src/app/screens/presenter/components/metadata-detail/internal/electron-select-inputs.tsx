import { Box, ColorInput, TextInput } from '@mantine/core';
import { MetadataOptions } from '@shukun/schema';

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
      onCreate={() => ({
        key: 'untitle',
        label: 'untitle',
      })}
      renderItem={(itemValue, itemChange) => (
        <Box sx={{ display: 'flex' }}>
          <TextInput
            sx={{ flex: 1 }}
            label="key"
            value={itemValue.key}
            onChange={(event) =>
              itemChange({ ...itemValue, key: event.target.value })
            }
          />
          <TextInput
            sx={{ flex: 1 }}
            label="label"
            value={itemValue.label}
            onChange={(event) =>
              itemChange({ ...itemValue, label: event.target.value })
            }
          />
          <ColorInput
            sx={{ flex: 1 }}
            label="color"
            value={itemValue.color}
            onChange={(value) =>
              itemChange({
                ...itemValue,
                color: value || undefined,
              })
            }
          />
        </Box>
      )}
    />
  );
};
