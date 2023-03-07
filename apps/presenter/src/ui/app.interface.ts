import { PlayerSchema } from '@shukun/schema';

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
  player: PlayerSchema;
  eventCallback: (behavior: unknown, payload: unknown) => void;
  widgets: ReactWidgets;
};

export type ReactWidget = (...args: any) => JSX.Element;

export type ReactWidgets = Record<string, ReactWidget>;
