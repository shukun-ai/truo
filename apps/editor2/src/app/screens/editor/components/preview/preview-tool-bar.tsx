import { Box, Group, NativeSelect, SelectItem } from '@mantine/core';
import { useMemo } from 'react';

import { SavePresenterButton } from '../common/save-presenter-button';

import { devices } from './device';

export type PreviewToolBarProps = {
  selectedDevice: string;
  changeSelectedDevice: (deviceName: string) => void;
};

export const PreviewToolBar = ({
  selectedDevice,
  changeSelectedDevice,
}: PreviewToolBarProps) => {
  const deviceOptions = useMemo<SelectItem[]>(() => {
    return devices.map((device) => ({
      value: device.name,
      label: `${device.label}: ${device.width} / ${device.height}`,
    }));
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '4px 12px',
      }}
    >
      <NativeSelect
        data={deviceOptions}
        value={selectedDevice}
        onChange={(event) => changeSelectedDevice(event.target.value)}
      />
      <Box sx={{ flex: 1 }}></Box>
      <Group>
        <SavePresenterButton />
      </Group>
    </Box>
  );
};
