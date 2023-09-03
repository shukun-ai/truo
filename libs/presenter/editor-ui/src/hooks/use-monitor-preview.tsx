import { POST_MESSAGE_EDITOR_STATE } from '@shukun/presenter/definition';
import { useEffect } from 'react';

import { useEditorContext } from '../editor-context';

export const useMonitorPreview = () => {
  const { monitor } = useEditorContext();
  const { updatePreviewState } = monitor;

  useEffect(() => {
    window.addEventListener('message', (event) => {
      const payload = parseEvent(event.data);
      if (payload.state) {
        updatePreviewState(payload.state);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

const parseEvent = (data: unknown): { state?: unknown } => {
  if (
    typeof data === 'object' &&
    data &&
    'shukunType' in data &&
    data.shukunType === POST_MESSAGE_EDITOR_STATE &&
    'payload' in data &&
    typeof data.payload === 'object'
  ) {
    return data.payload as any;
  } else {
    return {};
  }
};
