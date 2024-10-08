import { Box, Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { MetadataElectron } from '@shukun/schema';

import { useCallback } from 'react';

import { MetadataEntity } from '../../../editor-context';

import { CreateElectronForm } from './create-electron-form';
import { Electron } from './electron';

export type ElectronsProps = {
  value: MetadataEntity['electrons'];
  onChange: (value: MetadataEntity['electrons']) => void;
  disabled?: boolean;
};

export const Electrons = ({ value, onChange, disabled }: ElectronsProps) => {
  const open = useCallback(() => {
    modals.open({
      title: '新建任务',
      children: (
        <CreateElectronForm
          onSubmit={(formValue) => {
            const electronName = formValue.electronName;
            const exist = value[electronName];

            if (exist) {
              notifications.show({
                color: 'red',
                title: '创建失败',
                message: '字段名已存在，请更换名称',
              });
              return;
            }

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
          disabled={disabled}
        />
      ))}
      <Button onClick={open} fullWidth variant="light" disabled={disabled}>
        新建字段
      </Button>
    </Box>
  );
};
