import { Injector } from '@shukun/presenter/definition';

import { AppProps } from '../interfaces/app';

export type ObservableAppProps = {
  injector: Injector;
  render: (app: AppProps) => JSX.Element;
};

export const ObservableApp = ({ injector, render }: ObservableAppProps) => {
  const app: AppProps = {} as any;
  return render(app);
};
