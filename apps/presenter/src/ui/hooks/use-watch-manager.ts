import { PresenterContainer } from '@shukun/schema';
import { AppProps } from '@shukun/widget-react';
import { useEffect } from 'react';

export const useWatchManager = (
  containerId: string,
  container: PresenterContainer,
  app: AppProps,
) => {
  useEffect(() => {
    Object.entries(container.watches).forEach(([watchId, watch]) => {
      app.watchManager.register(
        { scope: 'container', containerId, watchId },
        watch,
      );
    });

    return () => {
      Object.entries(container.watches).forEach(([watchId]) => {
        app.watchManager.unregister({
          scope: 'container',
          containerId,
          watchId,
        });
      });
    };
  }, [app.watchManager, container.watches, containerId]);
};
