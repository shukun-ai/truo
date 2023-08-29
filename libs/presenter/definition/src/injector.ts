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

import { Repository } from './repository';

export type Injector = {
  environments: {
    production: boolean;
    serverDomain: string;
    storageDomain: string;
    assetDomain: string;
  };
  devtool: {
    send: (action: string, scope: string, state: unknown) => void;
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
    loadRepositories: (
      router: RouterState,
    ) => Promise<Record<string, Repository>>;
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
  template: {
    run: (template: unknown, state: unknown) => unknown;
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
