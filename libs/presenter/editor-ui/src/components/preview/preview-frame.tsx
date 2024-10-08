import { Box } from '@mantine/core';
import {
  POST_MESSAGE_EDITOR_PREVIEW,
  RouterMode,
} from '@shukun/presenter/definition';
import { useObservableState } from 'observable-hooks';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useEditorContext } from '../../editor-context';
import { getPreviewRefreshObservable } from '../../events/preview-event';

import { usePreviewUrl } from '../../hooks/use-preview-url';

import { devices } from './device';

import { DeviceFrame } from './internal/device-frame';
import { PreviewToolBar } from './preview-tool-bar';

export type PreviewFrameProps = {
  //
};

export const PreviewFrame = () => {
  const { dispatch } = useEditorContext();
  const { deserialization } = dispatch;
  const previewUrl = usePreviewUrl('');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previewRefresh = useObservableState(getPreviewRefreshObservable());

  const editorModePreviewUrl = useMemo(() => {
    // @remark the Editor PostMessage only active in Editor RouterMode for security reason
    return previewUrl + `?mode=${RouterMode.Editor}`;
  }, [previewUrl]);

  useEffect(() => {
    if (iframeRef.current && previewRefresh) {
      const presenter = deserialization.build();
      iframeRef.current.contentWindow?.postMessage(
        {
          shukunType: POST_MESSAGE_EDITOR_PREVIEW,
          payload: {
            presenter,
          },
        },
        '*',
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewRefresh]);

  const [selectedDevice, setSelectedDevice] = useState<string>('monitor');

  const device = useMemo(() => {
    const device = devices.find((device) => device.name === selectedDevice);
    return device ? device : devices[devices.length - 1];
  }, [selectedDevice]);

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
        }}
      >
        <DeviceFrame device={device}>
          <iframe
            ref={iframeRef}
            src={editorModePreviewUrl}
            title="Preview"
            style={{
              border: 'none',
              width: device.width,
              height: device.height,
            }}
          />
        </DeviceFrame>
      </Box>
    </Box>
  );
};
