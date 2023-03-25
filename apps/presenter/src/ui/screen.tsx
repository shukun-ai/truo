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
  }
};

const getContainerAppProps = (
  appProps: AppProps,
  containerId: string,
): AppProps => {
  return {
    ...appProps,
    containerId,
    states: extractContainerStates(appProps.rawStates, containerId),
  };
};

const extractContainerStates = (states: any, containerId: string) => {
  const newStates: any = {};
  for (const [id, value] of Object.entries(states)) {
    const idSet = id.split(':');

    if (idSet[0] === '_app') {
      newStates[idSet[1]] = value;
    } else if (idSet[0] === 'container' && idSet[1] === containerId) {
      newStates[idSet[2]] = value;
    } else if (idSet[0] === 'repository' && idSet[1] === containerId) {
      newStates[idSet[2]] = value;
    }
  }
  return newStates;
};
