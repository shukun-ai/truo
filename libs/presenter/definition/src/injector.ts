import {
  ConnectorRequester,
  PublicRequester,
  SourceRequester,
} from '@shukun/api';

import {
  AuthenticationToken,
  PresenterSchema,
  UnknownSourceModel,
} from '@shukun/schema';
import { Observable } from 'rxjs';

export type Injector = {
  environments: {
    production: boolean;
    serverDomain: string;
    storageDomain: string;
    assetDomain: string;
    postMessageCrossOrigin: boolean;
  };
  devtool: {
    logState: (description: string, state: unknown) => void;
    logWidget: (
      description: string,
      widgetId: string,
      state: { index: number; item: unknown },
      properties: Record<string, unknown>,
    ) => void;
    query: () => Observable<DevtoolLogs>;
  };
  logger: {
    info: (message: string, payload?: unknown) => void;
    error: (message: string, payload?: unknown) => void;
  };
  store: {
    update: <T>(path: string[], callback: (previous: T) => T) => void;
    remove: (path: string[]) => void;
    getValue: <T>(path: string[]) => T;
    query: <T>(path: string[]) => Observable<T>;
    queryAll: () => Observable<unknown>;
    getAllValue: () => unknown;
  };
  loader: {
    loadPresenter: (router: RouterState) => Promise<PresenterSchema>;
    loadWidgets: (router: RouterState) => Promise<Record<string, any>>;
  };
  api: {
    publicRequester: PublicRequester;
    connectorRequester: ConnectorRequester;
    createSourceRequester: <Model extends UnknownSourceModel>(
      atomName: string,
    ) => SourceRequester<Model>;
  };
  auth: {
    signIn: (token: AuthenticationToken) => void;
    signOut: () => void;
  };
  router: {
    go: (payload: { page?: string; search?: Record<string, unknown> }) => void;
    replace: (payload: {
      page?: string;
      search?: Record<string, unknown>;
    }) => void;
    back: () => void;
  };
  editor: {
    listenPresenter: (
      callback: (payload: { presenter: PresenterSchema }) => void,
    ) =>
      | {
          unregister: () => void;
        }
      | undefined;
    listenDevtool: () => { unregister: () => void } | undefined;
  };
};

export type RouterState = {
  app: string;
  orgName: string;
  page: string;
  search: Record<string, unknown>;
  mode: RouterMode;
};

export enum RouterMode {
  Local = 'local',
  Editor = 'Editor',
  Server = 'server',
}

export type AuthState = {
  current: AuthenticationToken | null;
};

export type DevtoolLogs = {
  state: Record<string, unknown>;
  widgetState: Record<string, { index: number; item: unknown }>;
  widgetProperties: Record<string, unknown>;
};
