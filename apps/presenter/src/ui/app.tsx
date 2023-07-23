import { AppProps } from '@shukun/presenter/widget-react';
import { PresenterScreen } from '@shukun/schema';
import { useMemo } from 'react';

import { Screen } from './screen';
import { SignInScreen } from './system/sign-in-screen';

export const App = (props: AppProps) => {
  const currentScreen = useMemo<PresenterScreen | null>(() => {
    const screen = props.presenter.screens[props.context.screen];
    return screen ?? null;
  }, [props.presenter.screens, props.context.screen]);

  if (props.showSignInScreen) {
    return <SignInScreen app={props} />;
  }

  if (!currentScreen) {
    return <div>Please configure the first screen.</div>;
  }

  return <Screen screen={currentScreen} {...props} />;
};
