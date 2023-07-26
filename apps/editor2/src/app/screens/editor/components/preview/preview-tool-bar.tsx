import { Box, Group, NativeSelect, SelectItem, Text } from '@mantine/core';
import { useObservableState } from 'observable-hooks';
import { useMemo } from 'react';

import { useAppContext } from '../../../../contexts/app-context';
import { usePreviewUrl } from '../../../../hooks/use-preview-url';
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
  const app = useAppContext();
  const screen = useObservableState(
    app.repositories.presenterRepository.screenRepository.selectedScreenEntity$,
    null,
  );
  const previewUrl = usePreviewUrl(screen?.screenName ?? '');

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
      <Box sx={{ flex: 1 }} ml={12} mr={12}>
        <Text truncate c="gray.6">
          {previewUrl}
        </Text>
      </Box>
      <Group>
        <SavePresenterButton />
      </Group>
    </Box>
  );
};
