import { POST_MESSAGE_EDITOR_DEVTOOL } from '@shukun/presenter/definition';
import { useEffect } from 'react';

import { DevtoolLogs, useEditorContext } from '../editor-context';

export const useDevtool = () => {
  const { devtool } = useEditorContext();

  useEffect(() => {
    window.addEventListener('message', (event) => {
      const payload = parseEvent(event.data);
      if (payload) {
        devtool.update(payload);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

const parseEvent = (data: unknown): DevtoolLogs | undefined => {
  if (
    typeof data === 'object' &&
    data &&
    'shukunType' in data &&
    data.shukunType === POST_MESSAGE_EDITOR_DEVTOOL &&
    'payload' in data &&
    typeof data.payload === 'object'
  ) {
    return data.payload as any;
  } else {
    return undefined;
  }
};
