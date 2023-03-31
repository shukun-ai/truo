import { PresenterScreen } from '@shukun/schema';
import { AppProps } from '@shukun/widget-react';
import { useMemo } from 'react';

import { Screen } from './screen';
import { SignInScreen } from './system/sign-in-screen';

export const App = (props: AppProps) => {
  const currentScreen = useMemo<PresenterScreen | null>(() => {
    const screen = props.presenter.screens[props.context.screen];
    return screen ?? null;
  }, [props.presenter.screens, props.context.screen]);

  if (props.context.screen === 'sign-in') {
    return <SignInScreen app={props} />;
  }

  if (!currentScreen) {
    return <div>Did not found page.</div>;
  }

  return <Screen screen={currentScreen} {...props} />;
};
