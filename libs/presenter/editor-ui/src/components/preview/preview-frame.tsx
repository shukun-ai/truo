import { Box, useMantineTheme } from '@mantine/core';
import { useObservableState } from 'observable-hooks';
import { useEffect, useMemo, useRef, useState } from 'react';

import { getPreviewRefreshObservable } from '../../events/preview-event';

import { usePreviewUrl } from '../../hooks/use-preview-url';

import { devices } from './device';
import { PreviewToolBar } from './preview-tool-bar';

export type PreviewFrameProps = {
  //
};

export const PreviewFrame = () => {
  // const previewUrl = usePreviewUrl(screen?.screenName ?? '');
  const previewUrl = usePreviewUrl('');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previewRefresh = useObservableState(getPreviewRefreshObservable());

  useEffect(() => {
    if (iframeRef.current && previewRefresh) {
      iframeRef.current.src = previewUrl;
    }
  }, [previewRefresh, previewUrl]);

  const [selectedDevice, setSelectedDevice] = useState<string>('monitor');

  const device = useMemo(() => {
    const device = devices.find((device) => device.name === selectedDevice);
    return device ? device : devices[devices.length - 1];
  }, [selectedDevice]);

  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        minWidth: 0,
        minHeight: 0,
        overflow: 'hidden',
        background: theme.colors.gray[1],
      }}
    >
      <Box>
        <PreviewToolBar
          selectedDevice={selectedDevice}
          changeSelectedDevice={setSelectedDevice}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flex: 1,
          overflow: 'scroll',
          padding: 12,
          paddingTop: 0,
        }}
      >
        <Box
          sx={{
            boxSizing: 'content-box',
            width: device.width,
            height: device.height,
            minWidth: device.width,
            minHeight: device.height,
            border: 'solid 1px',
            borderColor: theme.colors.gray[4],
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <iframe
            ref={iframeRef}
            src={previewUrl}
            title="Preview"
            style={{
              border: 'none',
              width: device.width,
              height: device.height,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
