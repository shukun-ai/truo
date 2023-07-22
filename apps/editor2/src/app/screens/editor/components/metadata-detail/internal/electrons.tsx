import { Box, Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { MetadataElectron } from '@shukun/schema';

import { useCallback } from 'react';

import { MetadataEntity } from '../../../../../../repositories/metadata/metadata-ref';

import { CreateElectronForm } from './create-electron-form';
import { Electron } from './electron';

export type ElectronsProps = {
  value: MetadataEntity['electrons'];
  onChange: (value: MetadataEntity['electrons']) => void;
};

export const Electrons = ({ value, onChange }: ElectronsProps) => {
  const open = useCallback(() => {
    modals.open({
      title: '新建任务',
      children: (
        <CreateElectronForm
          onSubmit={(formValue) => {
            onChange({
              ...value,
              [formValue.electronName]: {
                fieldType: 'Text',
                name: formValue.electronName,
                label: formValue.electronName,
                isRequired: false,
              },
            });
            modals.closeAll();
          }}
        />
      ),
    });
  }, [onChange, value]);

  const handleChange = (
    electronName: string,
    newElectron: MetadataElectron | null,
  ) => {
    const newValue = structuredClone(value);
    if (!newElectron) {
      delete newValue[electronName];
      onChange(newValue);
    } else {
      onChange({
        ...newValue,
        [electronName]: newElectron,
      });
    }
  };

  return (
    <Box>
      {Object.entries(value).map(([electronName, electron]) => (
        <Electron
          key={electronName}
          electronName={electronName}
          value={electron}
          onChange={(newElectron) => handleChange(electronName, newElectron)}
        />
      ))}
      <Button onClick={open} fullWidth variant="light">
        新建字段
      </Button>
    </Box>
  );
};
