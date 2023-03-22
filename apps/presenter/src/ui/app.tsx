import { PresenterScreen } from '@shukun/schema';
import { useMemo } from 'react';

import { AppProps } from './app.interface';
import { Screen } from './screen';

export const App = (props: AppProps) => {
  const currentScreen = useMemo<PresenterScreen | null>(() => {
    const screen = props.presenter.screens[props.router.page];
    return screen ?? null;
  }, [props.presenter.screens, props.router.page]);

  if (!currentScreen) {
    return <div>Did not found page.</div>;
  }

  return <Screen screen={currentScreen} {...props} />;
};
