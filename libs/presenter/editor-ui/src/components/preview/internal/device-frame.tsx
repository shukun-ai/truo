import { Box } from '@mantine/core';

import { useMemo } from 'react';

import { Device } from '../device.type';

export type DeviceFrameProps = {
  device: Device;
  children: JSX.Element;
};

export const DeviceFrame = ({ device, children }: DeviceFrameProps) => {
  const background = useMemo(() => {
    if (!device.background) {
      return undefined;
    }
    const href = new URL(`./${device.background}`, import.meta.url).href;
    return `url(${href})`;
  }, [device.background]);

  return (
    <Box>
      <Box
        sx={{
          boxSizing: 'content-box',
          paddingLeft: device.left,
          paddingRight: device.right,
          paddingTop: device.top,
          paddingBottom: device.bottom,
          width: device.width,
          height: device.height,
          minWidth: device.width,
          minHeight: device.height,
          overflow: 'hidden',
          background: background,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
