import { PresenterScreen } from '@shukun/schema';
import { DashboardLayout, WorkshopLayout } from '@shukun/widget-react';
import { AppProps } from '@shukun/widget-react';
import { useMemo } from 'react';

import { getSyntheticState } from '../effects/store/synthetic-state';

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
        const containerAppProps = getContainerAppProps(appProps, containerId);
        containers[slotId] = (
          <Container
            containerId={containerId}
            container={container}
            app={containerAppProps}
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
    case 'Workshop':
      return WorkshopLayout;
  }
};

const getContainerAppProps = (
  appProps: AppProps,
  containerId: string,
): AppProps => {
  return {
    ...appProps,
    containerId,
    states: getSyntheticState(appProps.rawStates, containerId),
  };
};
