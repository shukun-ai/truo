import { AppProps } from '../interfaces/app';

export const App = (appProps: AppProps) => {
  return <>{JSON.stringify(appProps.state)}</>;
};
