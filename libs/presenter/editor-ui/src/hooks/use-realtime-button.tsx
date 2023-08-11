import { useCallback, useEffect, useRef } from 'react';

export const useRealtimeButton = () => {
  const url = usePreviewUrl('home');
  const previewRef = useRef<Window | null>(null);

  const handleOpen = useCallback(() => {
    const closed = previewRef.current?.closed ?? true;

    if (!previewRef.current || closed) {
      // add loading
      previewRef.current = window.open(url, 'mozillaTab');
      // close loading
      // initialize: detect, auth, update definition

      // subscribe repositories
      // update presenter definition
      // reload page
      // change router
      // close destroy

      // listen state changes
      // listen logs
    } else {
      previewRef.current.focus();
    }
  }, [url]);

  useEffect(() => {
    window.addEventListener('message', handleMessage, false);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return { handleOpen };
};

const handleMessage = (event: MessageEvent) => {
  // Do we trust the sender of this message?  (might be
  // different from what we originally opened, for example).
  if (event.origin !== 'http://example.com') return;

  // event.source is popup
  // event.data is "hi there yourself!  the secret response is: rheeeeet!"
};
