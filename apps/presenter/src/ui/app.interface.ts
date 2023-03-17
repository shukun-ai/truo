import { PresenterEvent, PresenterSchema } from '@shukun/schema';

import { WidgetDefinitions } from '../effects/loaders/loader.interface';

export type AppProps = {
  context: {
    appName: string;
    orgName: string;
  };
  router: {
    page: string;
    search: Record<string, unknown>;
  };
  containers: {
    [key: `${string}:${string}:${string}`]: unknown;
  };
  presenter: PresenterSchema;
  eventCallback: (behavior: PresenterEvent, payload: unknown) => void;
  reactWidgets: ReactWidgets;
  widgetDefinitions: WidgetDefinitions;
};

export type ReactWidget = (...args: any) => JSX.Element;

export type ReactWidgets = Record<string, ReactWidget>;
