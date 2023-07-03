import { Box } from '@mantine/core';
import { useEffect, useRef } from 'react';

import { tap } from 'rxjs';

import { getPreviewRefreshObservable } from '../../events/preview-event';

export type PreviewFrameProps = {
  //
};

export const PreviewFrame = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // TODO use context to instead import explicitly
    const subscription = getPreviewRefreshObservable()
      .pipe(
        tap(() => {
          if (iframeRef.current) {
            iframeRef.current.src =
              'http://localhost:9010/presenter/pactl/test';
          }
        }),
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <iframe
        ref={iframeRef}
        src="http://localhost:9010/presenter/pactl/test"
        width="100%"
        height="100%"
        title="Preview"
        style={{ border: 'none' }}
      />
    </Box>
  );
};
