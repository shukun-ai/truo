import { PresenterScreen } from '@shukun/schema';
import { DashboardLayout } from '@shukun/widget-react';
import { AppProps } from '@shukun/widget-react';
import { useMemo } from 'react';

import { Container } from './container';

export type ScreenProps = {
  screen: PresenterScreen;
};

export const Screen = ({ screen, ...appProps }: ScreenProps & AppProps) => {
  const containers = useMemo(() => {
    const containers: Record<string, JSX.Element> = {};
    for (const [slotId, containerId] of Object.entries(screen.slots)) {
      const container = appProps.presenter.containers[containerId];
      if (container) {
        containers[slotId] = (
          <Container
            containerId={containerId}
            container={container}
            app={appProps}
          />
        );
      }
    }
    return containers;
  }, [appProps, screen.slots]);

  const Layout = getScreenLayout(screen);
  return <Layout {...containers} />;
};

const getScreenLayout = (screen: PresenterScreen) => {
  switch (screen.layout) {
    case 'Dashboard':
      return DashboardLayout;
  }
};
