import {
  ConnectorRequester,
  PublicRequester,
  SourceRequester,
} from '@shukun/api';
import { AuthenticationToken, UnknownSourceModel } from '@shukun/schema';
import { Observable } from 'rxjs';

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
  store: {
    update: <T>(path: string[], callback: (previous: T) => T) => void;
    remove: (path: string[]) => void;
    getValue: <T>(path: string[]) => T;
    query: <T>(path: string[]) => Observable<T>;
    queryAll: () => Observable<unknown>;
    getAllValue: () => unknown;
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
